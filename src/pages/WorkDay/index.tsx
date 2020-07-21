// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

// Components
import { ErrorBoundary, WorkdayScenesModal, ScenesTable } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';
import { useScenesQuery } from '../../bus/Scene';

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

    if (loading || !data || scenesLoading || !scenesData) {
        return <div>Loading...</div>;
    }

    const workday = data.workdays.find((workday) => workday.id === workdayId);

    if (!workday) {
        return <div>No workday exist</div>;
    }

    const sceneIds = workday.scenes.map((scene) => scene.id);
    const workdayScenes = _.intersectionWith(
        scenesData.scenes, sceneIds, (value, other) => value.id === other,
    );

    const deleteWorkdayHandler = async () => {
        const response = await deleteWorkday();
        response && response.data && void push(`/${projectId}/calendar`);
    };

    return (
        <WorkdayContainer>
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <WorkdayScenesModal
                    closeHandler = { () => void push(`/${projectId}/calendar/${workdayId}`) }
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
