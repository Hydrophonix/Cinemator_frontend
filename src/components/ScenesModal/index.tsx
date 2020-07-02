
// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { Modal, TableHead, SceneTableItem } from '..';

// Apllo hooks
import { useScenesQuery } from '../../bus/Scene';
import { useAddScenesToWorkdayMutation } from '../../bus/Workday';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';
import { TableStyles } from '../../assets';

// Constants
import { scenesThNames } from '../../@init/constants';

// Types
type Params = {
    projectId: string
    workdayId: string
}

type PropTypes = {
    closeHandler: () => void
    scenesIds: Array<string>
}

export const ScenesModal: FC<PropTypes> = ({ closeHandler, scenesIds }) => {
    const { projectId, workdayId } = useParams<Params>();
    const { data, loading } = useScenesQuery({ variables: { projectId }});
    const [ addScenesToWorkday ] = useAddScenesToWorkdayMutation();
    const [ scenesIdsArray, setScenesIdsArray ] = useArrayOfStringsForm(scenesIds);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addScenesToWorkdayHandler = async () => {
        const response = await addScenesToWorkday({ variables: { workdayId, sceneIds: scenesIdsArray }});

        if (response && response.data) {
            closeHandler();
        }
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader>Add scenes</ModalHeader>
            <Main>
                <TableStyles>
                    <Table>
                        <TableHead ThNames = { scenesThNames } />
                        <Tbody>
                            {
                                data.scenes.map((scene) => (
                                    <SceneTableItem
                                        key = { scene.id }
                                        { ...scene }
                                        handler = { () => setScenesIdsArray(scene.id) }
                                        isActive = { scenesIdsArray.includes(scene.id) }
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            </Main>
            <Footer>
                <Button onClick = { addScenesToWorkdayHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
