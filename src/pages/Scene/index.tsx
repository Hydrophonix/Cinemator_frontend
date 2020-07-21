// Core
import React, { FC, useContext } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import _ from 'lodash';

// Components
import { ErrorBoundary, SceneRequisitesModal, RequisitesTable } from '../../components';

// Apollo hooks
import { useScenesQuery, useDeleteSceneMutation } from '../../bus/Scene';
import { useRequisitesQuery } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { Container, Header, WorkdaysContainer } from './styles';

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

    const deleteSceneHandler = async () => {
        const response = await deleteScene();
        response && response.data && void push(`/${projectId}/scenes`);
    };

    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };

    return (
        <Container>
            <Route path = { '/:projectId/scenes/:sceneId/add-requisites' }>
                <SceneRequisitesModal
                    closeHandler = { () => void push(`/${projectId}/scenes/${sceneId}`) }
                    requisiteIds = { requisiteIds }
                />
            </Route>
            <Header>
                <nav>
                    <Button onClick = { () => void push(`/${projectId}/scenes`) }>To scenes</Button>
                    <Button onClick = { goBack }>Go back</Button>
                </nav>
                <h2>{`S: ${scene.number}`}</h2>
                <nav>
                    <Button onClick = { () => void push(`/${projectId}/scenes/${sceneId}/add-requisites`) }>
                        Add requisite
                    </Button>
                    <Button onClick = { () => void push(`/${projectId}/update-scene/${sceneId}`) }>
                        Update
                    </Button>
                    <Button onClick = { deleteSceneHandler }>Delete</Button>
                </nav>
            </Header>
            {
                scene.workdays.length !== 0 && (
                    <WorkdaysContainer>
                        {
                            scene.workdays.map((workday, index) => (
                                <Button
                                    key = { index }
                                    style = {{
                                        backgroundColor: theme.workday.anotherSecondary,
                                        color:           '#fff',
                                    }}
                                    onClick = { (event) => void workdayRedirectHandler(
                                        event, workday.id,
                                    ) }>
                                    {workday.date}
                                </Button>
                            ))
                        }
                    </WorkdaysContainer>
                )
            }
            <RequisitesTable
                requisites = { sceneRequisites }
                sceneId = { sceneId }
            />
        </Container>
    );
};


export default () => (
    <ErrorBoundary>
        <Scene />
    </ErrorBoundary>
);
