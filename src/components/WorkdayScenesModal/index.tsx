
// Core
import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Thead, Tr, Th, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { Modal } from '..';

// Apollo hooks
import { useScenesQuery } from '../../bus/Scene';
import { useUpdateWorkdayScenesMutation } from '../../bus/Workday';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';
import { TableStyles } from '../../assets';

// Types
type Params = {
    projectId: string
    workdayId: string
}

type PropTypes = {
    closeHandler: () => void
    sceneIds: Array<string>
}

export const WorkdayScenesModal: FC<PropTypes> = ({ closeHandler, sceneIds: scenesIds }) => {
    const { projectId, workdayId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useScenesQuery({ projectId });
    const [ updateWorkdayScenes ] = useUpdateWorkdayScenesMutation({ projectId });
    const [ scenesIdsArray, setScenesIdsArray ] = useArrayOfStringsForm(scenesIds);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addScenesToWorkdayHandler = async () => {
        const response = await updateWorkdayScenes({ variables: { workdayId, sceneIds: scenesIdsArray }});
        response && response.data && void closeHandler();
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.scene.secondary }}>Add scenes</ModalHeader>
            <Main>
                <TableStyles>
                    <Table>
                        <Thead>
                            <Tr className = 'scenesTableHead'>
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
                                data.scenes.map(({ id, sceneNumber, location }) => (
                                    <Tr
                                        className = 'scenesTableRow'
                                        key = { id }
                                        style = { scenesIdsArray.includes(id)
                                            ? { backgroundColor: 'green' } : {}
                                        }
                                        onClick = { () => void setScenesIdsArray(id) }>
                                        <Td>
                                            <div style = {{ width: 35, textAlign: 'center' }}>
                                                {`${sceneNumber}`}
                                            </div>
                                        </Td>
                                        <Td>{location}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            </Main>
            <Footer style = {{ backgroundColor: theme.scene.primary }}>
                <Button onClick = { addScenesToWorkdayHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
