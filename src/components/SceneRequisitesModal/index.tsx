
// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td  } from 'react-super-responsive-table';

// Components
import { Modal, TableHead } from '..';

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

// Instrunments
import { ORANGE } from '../../assets/globalStyles';

// Types
type Params = {
    projectId: string
    sceneId: string
}

type PropTypes = {
    closeHandler: () => void
    requisiteIds: Array<string>
}

export const SceneRequisitesModal: FC<PropTypes> = ({ closeHandler, requisiteIds }) => {
    const { projectId, sceneId } = useParams<Params>();
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
            <ModalHeader style = {{ backgroundColor: ORANGE.secondary }}>Add requisites</ModalHeader>
            <Main>
                <TableStyles>
                    <Table>
                        <TableHead
                            className = 'requisitesTableHead'
                            ThNames = { [ '#', 'Title' ] }
                        />
                        <Tbody>
                            {
                                data.requisites.map((requisite) => (
                                    <Tr
                                        className = 'requisitesTableRow'
                                        key = { requisite.id }
                                        style = {
                                            requisitesIdsArray.includes(requisite.id)
                                                ? { backgroundColor: 'lightgreen' } : {}
                                        }
                                        onClick = { () => void setRequisitesIdsArray(requisite.id) }>
                                        <Td>{requisite.id}</Td>
                                        <Td>{requisite.title}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            </Main>
            <Footer style = {{ backgroundColor: ORANGE.main }}>
                <Button onClick = { addRequsitesToSceneHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
