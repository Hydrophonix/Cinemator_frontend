
// Core
import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Thead, Tr, Th, Td  } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { Modal } from '..';

// Apollo hooks
import { useRequisitesQuery } from '../../bus/Requisite';
import { useUpdateSceneRequisitesMutation } from '../../bus/Scene';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';
import { TableStyles } from '../../assets';

// Types
type PropTypes = {
    closeHandler: () => void
    requisiteIds: Array<string>
}
type Params = {
    projectId: string
    sceneId: string
}

export const SceneRequisitesModal: FC<PropTypes> = ({ closeHandler, requisiteIds }) => {
    const { projectId, sceneId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateSceneRequisites ] = useUpdateSceneRequisitesMutation();
    const [ requisitesIdsArray, setRequisitesIdsArray ] = useArrayOfStringsForm(requisiteIds);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addRequsitesToSceneHandler = async () => {
        const response = await updateSceneRequisites({ variables: { sceneId, requisiteIds: requisitesIdsArray }});
        response && response.data && void closeHandler();
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.requisite.secondary }}>Add requisites</ModalHeader>
            <Main>
                <TableStyles>
                    <Table>
                        <Thead>
                            <Tr className = 'requisitesTableHead'>
                                <Th>
                                    <nav>
                                        <input
                                            type = 'number'
                                            value = { 0 }
                                            onChange = { () => void 0 }
                                        />
                                        {
                                            <span onClick = { () => void 0 }>
                                                <FontAwesomeIcon
                                                    color = { theme.requisite.hoverSecondary }
                                                    icon = 'times-circle'
                                                />
                                            </span>
                                        }
                                    </nav>
                                </Th>
                                <Th>Title</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.requisites.map((requisite) => (
                                    <Tr
                                        className = 'requisitesTableRow'
                                        key = { requisite.id }
                                        style = {
                                            requisitesIdsArray.includes(requisite.id)
                                                ? { backgroundColor: 'green' } : {}
                                        }
                                        onClick = { () => void setRequisitesIdsArray(requisite.id) }>
                                        <Td>
                                            <div style = {{ width: 35, textAlign: 'center' }}>
                                                {1}
                                            </div>
                                        </Td>
                                        <Td>{requisite.title}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            </Main>
            <Footer style = {{ backgroundColor: theme.requisite.primary }}>
                <Button onClick = { addRequsitesToSceneHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
