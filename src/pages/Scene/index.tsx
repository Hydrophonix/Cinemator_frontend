// Core
import React, { FC, useContext, useEffect } from 'react';
import { useHistory, useParams, Route, Switch } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _intersectionWith from 'lodash/intersectionWith';

// Components
import { ErrorBoundary, RequisitesModal, RequisitesTable, LocationsModal, WorkdaysModal } from '../../components';

// Apollo hooks
import {
    useScenesQuery,
    useDeleteSceneMutation,
    useUpdateSceneWorkdaysMutation,
    useUpdateSceneRequisitesMutation,
    useUpdateSceneLocationsMutation,
} from '../../bus/Scene';
import { useRequisitesQuery } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { Container, Header, WorkdaysContainer, LocationsContainer } from './styles';
import { useArrayOfStringsForm } from '../../hooks';

// Types
type Params = {
    projectId: string
    sceneId: string
}
const Scene: FC = () => {
    const { push } = useHistory();
    const { projectId, sceneId } = useParams<Params>();
    const theme = useContext(ThemeContext);

    const { data, loading } = useScenesQuery({ projectId });
    const { data: requisiteData, loading: requisiteLoading } = useRequisitesQuery({ projectId });

    const [ updateSceneWorkdays ] = useUpdateSceneWorkdaysMutation();
    const [ updateSceneRequisites ] = useUpdateSceneRequisitesMutation();
    const [ updateSceneLocations ] = useUpdateSceneLocationsMutation();
    const [ deleteScene ] = useDeleteSceneMutation({ projectId, sceneId });

    const [ workdayIds, setWorkdayIds, setInitialWorkdayIds ] = useArrayOfStringsForm([]);
    const [ requisiteIds, setRequisiteIds, setInitialRequisiteIds ] = useArrayOfStringsForm([]);
    const [ locationIds, setLocationIdsArray, setInitialLocationIds ] = useArrayOfStringsForm([]);

    const scene = data?.scenes.find((scene) => scene.id === sceneId);
    const requisiteIdsArray = scene?.requisites.map((requisite) => requisite.id);
    const workdayIdsArray = scene?.workdays.map((workday) => workday.id);

    useEffect(() =>{
        scene && void setInitialLocationIds(scene.locations.map((location) => location.id));
        requisiteIdsArray && void setInitialRequisiteIds(requisiteIdsArray);
        workdayIdsArray && void setInitialWorkdayIds(workdayIdsArray);
    }, [ scene ]);

    if (loading || !data || requisiteLoading || !requisiteData) {
        return <div>Loading...</div>;
    }

    if (!scene || !requisiteIdsArray) {
        return <div>No scene exist</div>;
    }

    const sceneRequisites = _intersectionWith(
        requisiteData.requisites, requisiteIdsArray, (value, other) => value.id === other,
    );

    const deleteSceneHandler = async () => {
        const isContinue = window.confirm(`Confirm delete scene: ${scene.number}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteScene();
        response && response.data && void push(`/${projectId}/scenes`);
    };

    const updateSceneWorkdaysHandler = async () => {
        const response = await updateSceneWorkdays({ variables: { sceneId, workdayIds }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    const updateSceneRequisitesHandler = async () => {
        const response = await updateSceneRequisites({ variables: { sceneId, requisiteIds }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    const updateSceneLocationsHandler = async () => {
        const response = await updateSceneLocations({ variables: { sceneId, locationIds }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };

    return (
        <Container>
            <Switch>
                <Route path = { '/:projectId/scenes/:sceneId/add-workdays' }>
                    <WorkdaysModal
                        closeHandler = { () => {
                            workdayIdsArray && setInitialWorkdayIds(workdayIdsArray);
                            push(`/${projectId}/scenes/${sceneId}`);
                        } }
                        handler = { (workdayId: string) => void setWorkdayIds(workdayId) }
                        saveHandler = { updateSceneWorkdaysHandler }
                        workdayIds = { workdayIds }
                    />
                </Route>
                <Route path = { '/:projectId/scenes/:sceneId/add-requisites' }>
                    <RequisitesModal
                        closeHandler = { () => {
                            requisiteIdsArray && setInitialRequisiteIds(requisiteIdsArray);
                            push(`/${projectId}/scenes/${sceneId}`);
                        } }
                        handler = { (requisiteId: string) => void setRequisiteIds(requisiteId) }
                        requisiteIds = { requisiteIds }
                        saveHandler = { updateSceneRequisitesHandler }
                    />
                </Route>
                <Route path = { '/:projectId/scenes/:sceneId/locations' }>
                    <LocationsModal
                        closeHandler = { () => void push(`/${projectId}/scenes/${sceneId}`) }
                        handler = { setLocationIdsArray }
                        locationIds = { locationIds }
                        saveHandler = { updateSceneLocationsHandler }
                    />
                </Route>
            </Switch>
            <Header>
                <nav>
                    <Button
                        title = 'Back to scenes'
                        onClick = { () => void push(`/${projectId}/scenes`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16, marginRight: 5 }}
                        />
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'mask'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>{`S: ${scene.number}`}</h2>
                <nav>
                    <Button
                        title = 'Add workdays'
                        onClick = { () => void push(`/${projectId}/scenes/${sceneId}/add-workdays`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>W:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button
                        title = 'Add requisites'
                        onClick = { () => void push(`/${projectId}/scenes/${sceneId}/add-requisites`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>R:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button
                        title = 'Add locations'
                        onClick = { () => void push(`/${projectId}/scenes/${sceneId}/locations`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>L:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-scene/${sceneId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button
                        title = 'Delete'
                        onClick = { deleteSceneHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            {
                scene.workdays.length !== 0 && (
                    <WorkdaysContainer>
                        {
                            scene.workdays.map((workday) => (
                                <Button
                                    key = { workday.id }
                                    style = {{ backgroundColor: theme.workday.anotherSecondary, color: '#fff' }}
                                    onClick = { (event) => void workdayRedirectHandler(event, workday.id) }>
                                    {workday.date}
                                </Button>
                            ))
                        }
                    </WorkdaysContainer>
                )
            }
            {
                scene.locations.length !== 0 && (
                    <LocationsContainer>
                        {
                            scene.locations.map((location) => (
                                <Button
                                    key = { location.id }
                                    style = {{ backgroundColor: theme.scene.secondary, color: '#fff' }}>
                                    {location.name}
                                </Button>
                            ))
                        }
                    </LocationsContainer>
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
