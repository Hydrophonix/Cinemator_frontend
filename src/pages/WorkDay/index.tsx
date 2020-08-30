// Core
import React, { FC, useEffect, useRef } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _intersectionWith from 'lodash/intersectionWith';

// Containers
import { ScenesModal } from '../../containers';

// Components
import { ErrorBoundary, ScenesTable } from '../../components';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';
import { useScenesQuery, useCompleteManyScenesMutation } from '../../bus/Scene';
import { useUpdateWorkdayScenesMutation } from '../../bus/Workday';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { Button, Spinner, AdaptiveScroll } from '../../elements';

// Styles
import { Container, Header, Info } from './styles';

// Types
type Params = {
    projectId: string
    workdayId: string
}

const Workday: FC = () => {
    const { push } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const headerRef = useRef<HTMLElement>(null);
    const { data } = useWorkdaysQuery({ projectId });
    const { data: scenesData } = useScenesQuery({ projectId });
    const [ updateWorkdayScenes, { loading: updateWorkdayScenesLoading }] = useUpdateWorkdayScenesMutation();
    const [ completeManyScenes, { loading: completeManyScenesLoading }] = useCompleteManyScenesMutation();
    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const workday = data?.workdays.find((workday) => workday.id === workdayId);
    const sceneIdsArray = workday?.scenes.map((scene) => scene.id);
    const isAllWorkdayScenesComplete = workday?.scenes.every((scene) => scene.isCompleted);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
    }, [ workday ]);

    if (!data || !scenesData) {
        return <Spinner />;
    }

    if (!workday || !sceneIdsArray) {
        push(`/${projectId}/calendar`);

        return null;
    }

    const workdayScenes = _intersectionWith(
        scenesData.scenes, sceneIdsArray, (value, other) => value.id === other,
    );

    const updateWorkdayScenesHandler = async () => {
        const response = await updateWorkdayScenes({ variables: { workdayId, sceneIds }});
        response && response.data && void push(`/${projectId}/calendar/${workdayId}`);
    };

    const completeScenesHandler = async () => {
        const isConfirmed = window.confirm('Complete all workday scenes?'); // eslint-disable-line no-alert

        if (isConfirmed) {
            await completeManyScenes({ variables: { sceneIds }});
        }
    };

    return (
        <Container>
            {completeManyScenesLoading && <Spinner absolute />}
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <ScenesModal
                    closeHandler = { () => {
                        workday && sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
                        push(`/${projectId}/calendar/${workdayId}`);
                    } }
                    handler = { (sceneId: string) => void setSceneIds(sceneId) }
                    saveHandler = { updateWorkdayScenesHandler }
                    saveHandlerLoading = { updateWorkdayScenesLoading }
                    sceneIds = { sceneIds }
                />
            </Route>
            <Header ref = { headerRef }>
                <nav>
                    <Button
                        style = {{ width: 55 }}
                        title = 'Back to calendar'
                        onClick = { () => void push(`/${projectId}/calendar`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16, marginRight: 5 }}
                        />
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'calendar-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>W: {workday.date}</h2>
                <nav>
                    <Button
                        disabled = { !isOnline }
                        title = 'Add scenes'
                        onClick = { () => void push(`/${projectId}/calendar/${workdayId}/add-scenes`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>S:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button
                        disabled = { !isOnline || isAllWorkdayScenesComplete }
                        style = {{ width: 35 }}
                        title = 'Complete all scenes'
                        onClick = { () => completeScenesHandler() }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'check'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button
                        disabled = { !isOnline }
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-workday/${workdayId}`) }>
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
                    workday.description && (
                        <Info>
                            <div><span>{workday.description}</span></div>
                        </Info>
                    )
                }
                <ScenesTable
                    scenes = { workdayScenes }
                    workdayId = { workdayId }
                />
            </AdaptiveScroll>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
