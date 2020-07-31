// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _intersectionWith from 'lodash/intersectionWith';

// Containers
import { ScenesModal } from '../../containers';

// Components
import { ErrorBoundary, ScenesTable } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';
import { useScenesQuery } from '../../bus/Scene';
import { useUpdateWorkdayScenesMutation } from '../../bus/Workday';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Elements
import { Button, Spinner } from '../../elements';

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
    const { data, loading } = useWorkdaysQuery({ projectId });
    const { data: scenesData, loading: scenesLoading } = useScenesQuery({ projectId });
    const { setGlobalDateRangeRedux } = useInputsRedux();
    const [ deleteWorkday, { loading: deleteWorkdayLoading }] = useDeleteWorkdayMutation({
        projectId, workdayId, setGlobalDateRangeRedux,
    });
    const [ updateWorkdayScenes, { loading: updateWorkdayScenesLoading }] = useUpdateWorkdayScenesMutation({
        projectId,
    });
    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);

    const workday = data?.workdays.find((workday) => workday.id === workdayId);
    const sceneIdsArray = workday?.scenes.map((scene) => scene.id);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
    }, [ workday ]);

    if (loading || !data || scenesLoading || !scenesData) {
        return <Spinner />;
    }

    if (!workday || !sceneIdsArray) {
        return <div>No workday exist</div>; // TODO: MAKE redirect component
    }

    const workdayScenes = _intersectionWith(
        scenesData.scenes, sceneIdsArray, (value, other) => value.id === other,
    );

    const updateWorkdayScenesHandler = async () => {
        const response = await updateWorkdayScenes({ variables: { workdayId, sceneIds }});
        response && response.data && void push(`/${projectId}/calendar/${workdayId}`);
    };

    const deleteWorkdayHandler = async () => {
        const isContinue = window.confirm(`Confirm delete workday: ${workday.date}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteWorkday();
        response && response.data && void push(`/${projectId}/calendar`);
    };

    return (
        <Container>
            {deleteWorkdayLoading && <Spinner absolute />}
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
            <Header>
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
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-workday/${workdayId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button
                        title = 'Delete'
                        onClick = { deleteWorkdayHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            {
                workday.description && (
                    <Info>
                        {workday.description && <div><p>{workday.description}</p></div>}
                    </Info>
                )
            }
            <ScenesTable
                scenes = { workdayScenes }
                workdayId = { workdayId }
            />
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
