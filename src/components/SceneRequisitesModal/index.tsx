
// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { Modal, TableHead, RequisiteTableItem } from '..';

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

// Constants
import { scenesThNames } from '../../@init/constants';

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
    const { data, loading } = useRequisitesQuery({ variables: { projectId }});
    const [ updateSceneRequisites ] = useUpdateSceneRequisitesMutation();
    const [ requisitesIdsArray, setRequisitesIdsArray ] = useArrayOfStringsForm(requisiteIds);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addRequsitesToSceneHandler = async () => {
        const response = await updateSceneRequisites({ variables: { sceneId, requisiteIds: requisitesIdsArray }});

        if (response && response.data) {
            closeHandler();
        }
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader>Add requisites</ModalHeader>
            <Main>
                <TableStyles>
                    <Table>
                        <TableHead ThNames = { scenesThNames } />
                        <Tbody>
                            {
                                data.requisites.map((requisite) => (
                                    <RequisiteTableItem
                                        key = { requisite.id }
                                        { ...requisite }
                                        isActive = { requisitesIdsArray.includes(requisite.id) }
                                        onClickHandler = { () => setRequisitesIdsArray(requisite.id) }
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            </Main>
            <Footer>
                <Button onClick = { addRequsitesToSceneHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
