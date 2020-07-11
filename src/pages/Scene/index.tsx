// Core
import React, { FC, useContext } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import _ from 'lodash';

// Components
import { ErrorBoundary, TableHead, SceneRequisitesModal } from '../../components';

// Apollo hooks
import { useScenesQuery, useDeleteSceneMutation } from '../../bus/Scene';
import { useRequisitesQuery } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { SceneContainer, SceneHeader } from './styles';
import { TableStyles } from '../../assets';

// Types
type Params = {
    projectId: string
    sceneId: string
}
const Scene: FC = () => {
    const { goBack, push } = useHistory();
    const { projectId, sceneId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useScenesQuery({ projectId });
    const { data: requisiteData, loading: requisiteLoading } = useRequisitesQuery({ projectId });
    const [ deleteScene ] = useDeleteSceneMutation({ projectId, sceneId });

    if (loading || !data || requisiteLoading || !requisiteData) {
        return <div>Loading...</div>;
    }

    const scene = data.scenes.find((scene) => scene.id === sceneId);

    if (!scene) {
        return <div>No scene exist</div>;
    }

    const requisiteIds = scene.requisites.map((requisite) => requisite.id);
    const sceneRequisites = _.intersectionWith(
        requisiteData.requisites, requisiteIds, (value, other) => value.id === other,
    );

    const requisiteRedirectHandler = (requisiteId: string) => void push(`/${projectId}/requisites/${requisiteId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };
    const deleteSceneHandler = async () => {
        const response = await deleteScene();
        response && response.data && void push(`/${projectId}/scenes`);
    };

    return (
        <SceneContainer>
            <Route path = { '/:projectId/scenes/:sceneId/add-requisites' }>
                <SceneRequisitesModal
                    closeHandler = { () => void push(`/${projectId}/scenes/${sceneId}`) }
                    requisiteIds = { requisiteIds }
                />
            </Route>
            <SceneHeader>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/scenes`) }>To scenes</Button>
                    <Button onClick = { goBack }>Go back</Button>
                </div>
                <h2>{`Scene: ${scene.sceneNumber}`}</h2>
                <div>
                    <Button onClick = { () => void push(
                        `/${projectId}/scenes/${sceneId}/add-requisites`,
                    ) }>
                        Add requisite
                    </Button>
                    <Button onClick = { () => void push(`/${projectId}/update-scene/${sceneId}`) }>
                        Update
                    </Button>
                    <Button onClick = { deleteSceneHandler }>Delete</Button>
                </div>
            </SceneHeader>
            {
                <TableStyles>
                    <Table>
                        <TableHead
                            className = 'requisitesTableHead'
                            ThNames = { [ '#', 'Title', 'Another scenes' ] }
                        />
                        <Tbody>
                            {
                                sceneRequisites.map(({ id, title, scenes }) => (
                                    <Tr
                                        className = 'requisitesTableRow'
                                        key = { id }
                                        onClick = { () => void requisiteRedirectHandler(id) }>
                                        <Td>{1}</Td>
                                        <Td>{title}</Td>
                                        <Td>
                                            {
                                                scenes.map((mappedScene, index) => {
                                                    if (mappedScene.sceneNumber === scene.sceneNumber) {
                                                        return null;
                                                    }

                                                    return (
                                                        <Button
                                                            key = { index }
                                                            style = {{
                                                                backgroundColor: theme.scene.secondary,
                                                                color:           '#fff',
                                                            }}
                                                            onClick = { (event) => void sceneRedirectHandler(
                                                                event, mappedScene.id,
                                                            ) }>
                                                            S:{`${mappedScene.sceneNumber}`}
                                                        </Button>
                                                    );
                                                })
                                            }
                                        </Td>
                                    </Tr>
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
