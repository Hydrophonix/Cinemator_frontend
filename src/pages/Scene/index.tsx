// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, RequisiteTableItem, SceneRequisitesModal } from '../../components';

// Apollo hooks
import { useScenesQuery, useDeleteSceneMutation } from '../../bus/Scene';

// Elements
import { Button } from '../../elements';

// Styles
import { SceneContainer } from './styles';
import { TableStyles } from '../../assets';

// Constants
import { requisitesThNames } from '../../@init/constants';

// Types
type Params = {
    projectId: string
    sceneId: string
}

const Scene: FC = () => {
    const { goBack, push } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, sceneId } = useParams<Params>();
    const { data, loading } = useScenesQuery({ variables: { projectId }});
    const [ deleteScene ] = useDeleteSceneMutation(projectId, sceneId);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const scene = data.scenes.find((scene) => scene.id === sceneId);

    if (!scene) {
        return <div>No scene exist</div>;
    }

    const requisiteIds = scene.requisites.map((requisite) => requisite.id);

    const requisiteRedirectHandler = (requisiteId: string) => push(`/${projectId}/requisites/${requisiteId}`);

    const deleteSceneHandler = async () => {
        const response = await deleteScene();

        if (response && response.data) {
            push(`/${projectId}/scenes`);
        }
    };

    return (
        <SceneContainer>
            <Route path = { '/:projectId/scenes/:sceneId/add-requisites' }>
                <SceneRequisitesModal
                    closeHandler = { () => push(`/${projectId}/scenes/${sceneId}`) }
                    requisiteIds = { requisiteIds }
                />
            </Route>
            <header>
                <div>
                    <Button onClick = { () => push(`/${projectId}/scenes`) }>To scenes</Button>
                    <Button onClick = { () => goBack() }>Go back</Button>
                </div>
                <h2>{`# ${scene.sceneNumber}`}: {scene.title}</h2>
                <div>
                    <Button onClick = { () => push(`/${projectId}/scenes/${sceneId}/add-requisites`) }>Add requisite</Button>
                    <Button onClick = { () => setIsEdit(!isEdit) }>
                        {isEdit ? 'Save' : 'Edit'}
                    </Button>
                    <Button onClick = { deleteSceneHandler }>
                        Delete
                    </Button>
                </div>
            </header>
            <main>
                Some scene data
            </main>
            {
                <TableStyles>
                    <Table>
                        <TableHead ThNames = { requisitesThNames } />
                        <Tbody>
                            {
                                scene.requisites.map((requisite) => (
                                    <RequisiteTableItem
                                        key = { requisite.id }
                                        { ...requisite }
                                        onClickHandler = { () => requisiteRedirectHandler(requisite.id) }
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableStyles>
            }
        </SceneContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scene />
    </ErrorBoundary>
);
