// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import _ from 'lodash';

// Components
import { ErrorBoundary, WorkdayScenesModal, ScenesTable } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';
import { useScenesQuery } from '../../bus/Scene';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

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
    const { push, goBack } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });
    const { data: scenesData, loading: scenesLoading } = useScenesQuery({ projectId });
    const { setDateRange } = useReduxInputs();
    const [ deleteWorkday ] = useDeleteWorkdayMutation({ projectId, workdayId, setDateRange });

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
                    <Button onClick = { () => void push(`/${projectId}/calendar`) }>To calendar</Button>
                    <Button onClick = { goBack }>Go back</Button>
                </div>
                <h2>W: {workday.date}</h2>
                <div>
                    <Button onClick = { () => void push(
                        `/${projectId}/calendar/${workdayId}/add-scenes`,
                    ) }>
                        Add scene
                    </Button>
                    <Button onClick = { () => void push(`/${projectId}/update-workday/${workdayId}`) }>
                        Update
                    </Button>
                    <Button onClick = { deleteWorkdayHandler }>Delete</Button>
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
