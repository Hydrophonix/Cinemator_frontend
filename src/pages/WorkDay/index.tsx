// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _intersectionWith from 'lodash/intersectionWith';

// Components
import { ErrorBoundary, ScenesModal, ScenesTable } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';
import { useScenesQuery } from '../../bus/Scene';
import { useUpdateWorkdayScenesMutation } from '../../bus/Workday';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkdayContainer, WorkdayHeader } from './styles';

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
    const [ deleteWorkday ] = useDeleteWorkdayMutation({ projectId, workdayId, setGlobalDateRangeRedux });
    const [ updateWorkdayScenes ] = useUpdateWorkdayScenesMutation({ projectId });
    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);

    const workday = data?.workdays.find((workday) => workday.id === workdayId);
    const sceneIdsArray = workday?.scenes.map((scene) => scene.id);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
    }, [ workday ]);

    if (loading || !data || scenesLoading || !scenesData) {
        return <div>Loading...</div>;
    }

    if (!workday || !sceneIdsArray) {
        return <div>No workday exist</div>;
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
        <WorkdayContainer>
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <ScenesModal
                    closeHandler = { () => {
                        workday && sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
                        push(`/${projectId}/calendar/${workdayId}`);
                    } }
                    handler = { (sceneId: string) => void setSceneIds(sceneId) }
                    saveHandler = { updateWorkdayScenesHandler }
                    sceneIds = { sceneIds }
                />
            </Route>
            <WorkdayHeader>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/calendar`) }>
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
                </div>
                <h2>W: {workday.date}</h2>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/calendar/${workdayId}/add-scenes`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>S:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button onClick = { () => void push(`/${projectId}/update-workday/${workdayId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button onClick = { deleteWorkdayHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
            </WorkdayHeader>
            <ScenesTable
                scenes = { workdayScenes }
                workdayId = { workdayId }
            />
        </WorkdayContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
