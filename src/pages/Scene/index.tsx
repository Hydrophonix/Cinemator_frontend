// Core
import React, { FC, useContext, useEffect, useRef } from 'react';
import { useHistory, useParams, Route, Switch } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _intersectionWith from 'lodash/intersectionWith';

// Containers
import { RequisitesModal, LocationsModal, WorkdaysModal } from '../../containers';

// Components
import { ErrorBoundary, RequisitesTable } from '../../components';

// Apollo
import {
    useScenesQuery,
    useUpdateSceneWorkdaysMutation,
    useUpdateSceneRequisitesMutation,
    useUpdateSceneLocationsMutation,
} from '../../bus/Scene';
import { useRequisitesQuery } from '../../bus/Requisite';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Elements
import { Button, Spinner, AdaptiveScroll } from '../../elements';

// Styles
import { Container, Header, Info, Relations } from './styles';
import { useArrayOfStringsForm } from '../../hooks';

// Types
type Params = {
    projectId: string
    sceneId: string
}
const Scene: FC = () => {
    const { push } = useHistory();
    const { projectId, sceneId } = useParams<Params>();
    const headerRef = useRef<HTMLElement>(null);
    const theme = useContext(ThemeContext);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const { data } = useScenesQuery({ projectId });
    const { data: requisiteData } = useRequisitesQuery({ projectId });

    const [ updateSceneWorkdays, { loading: updateSceneWorkdaysLoading }] = useUpdateSceneWorkdaysMutation();
    const [ updateSceneRequisites, { loading: updateSceneRequisitesLoading }] = useUpdateSceneRequisitesMutation();
    const [ updateSceneLocations, { loading: updateSceneLocationsLoading }] = useUpdateSceneLocationsMutation();

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

    if (!data || !requisiteData) {
        return <Spinner />;
    }

    if (!scene || !requisiteIdsArray) {
        push(`/${projectId}/scenes`);

        return null;
    }

    const sceneRequisites = _intersectionWith(
        requisiteData.requisites, requisiteIdsArray, (value, other) => value.id === other,
    );

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
                            workdayIdsArray && void setInitialWorkdayIds(workdayIdsArray);
                            push(`/${projectId}/scenes/${sceneId}`);
                        } }
                        handler = { (workdayId: string) => void setWorkdayIds(workdayId) }
                        saveHandler = { updateSceneWorkdaysHandler }
                        saveHandlerLoading = { updateSceneWorkdaysLoading }
                        workdayIds = { workdayIds }
                    />
                </Route>
                <Route path = { '/:projectId/scenes/:sceneId/add-requisites' }>
                    <RequisitesModal
                        closeHandler = { () => {
                            requisiteIdsArray && void setInitialRequisiteIds(requisiteIdsArray);
                            push(`/${projectId}/scenes/${sceneId}`);
                        } }
                        handler = { (requisiteId: string) => void setRequisiteIds(requisiteId) }
                        requisiteIds = { requisiteIds }
                        saveHandler = { updateSceneRequisitesHandler }
                        saveHandlerLoading = { updateSceneRequisitesLoading }
                    />
                </Route>
                <Route path = { '/:projectId/scenes/:sceneId/locations' }>
                    <LocationsModal
                        closeHandler = { () => void push(`/${projectId}/scenes/${sceneId}`) }
                        handler = { setLocationIdsArray }
                        locationIds = { locationIds }
                        saveHandler = { updateSceneLocationsHandler }
                        saveHandlerLoading = { updateSceneLocationsLoading }
                    />
                </Route>
            </Switch>
            <Header ref = { headerRef }>
                <nav>
                    <Button
                        style = {{ width: 55 }}
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
                <h2>
                    {`S:${scene.number}`}
                    {
                        scene.isCompleted && (
                            <>
                                :
                                <FontAwesomeIcon
                                    color = '#fff'
                                    icon = 'check'
                                    style = {{ width: 18, height: 18 }}
                                />
                            </>
                        )
                    }
                </h2>
                <nav>
                    <Button
                        disabled = { !isOnline }
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
                        disabled = { !isOnline }
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
                        disabled = { !isOnline }
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
                        disabled = { !isOnline }
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-scene/${sceneId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            <AdaptiveScroll refs = { [ headerRef ] }>
                {
                    (scene.title || scene.description) && (
                        <Info>
                            {scene.title && <div><p>{scene.title}</p></div>}
                            {scene.description && <div><span>{scene.description}</span></div>}
                        </Info>
                    )
                }
                <Relations>
                    {
                        scene.workdays.length !== 0 && (
                            <section style = {{ backgroundColor: theme.workday.containerBg }}>
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
                            </section>
                        )
                    }
                    {
                        scene.locations.length !== 0 && (
                            <section style = {{ backgroundColor: theme.scene.hoverSecondary }}>
                                {
                                    scene.locations.map((location) => (
                                        <Button
                                            key = { location.id }
                                            style = {{ backgroundColor: theme.scene.locationPrimary, color: '#fff' }}>
                                            {location.name}
                                        </Button>
                                    ))
                                }
                            </section>
                        )
                    }
                </Relations>
                <RequisitesTable
                    requisites = { sceneRequisites }
                    sceneId = { sceneId }
                />
            </AdaptiveScroll>
        </Container>
    );
};


export default () => (
    <ErrorBoundary>
        <Scene />
    </ErrorBoundary>
);
