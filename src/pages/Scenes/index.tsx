// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';
import { useWorkdaysQuery } from '../../bus/Workday';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, DatePicker, ScenesTable } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { ScenesContainer, Header } from './styles';

// Types
type Params = { projectId: string };

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useScenesQuery({ projectId });
    const { data: workdaysData, loading: workdaysLoading } = useWorkdaysQuery({ projectId });
    const { inputs, setDateRange, setItemIndex } = useReduxInputs();

    if (loading || !data || workdaysLoading || !workdaysData) {
        return <div>Loading...</div>;
    }

    const workdaysDates = workdaysData.workdays
        .map((workday) => new Date(workday.date))
        .sort((a, b) => a > b ? 1 : -1); // TODO: workdays server sort

    const { dateRange: { startDay, endDay }, index } = inputs.scenesInputs;

    const filterByDateRange = () => data.scenes.filter((scene) => scene.workdays.some((workday) => {
        const workdayDateInMs = new Date(workday.date).getTime();

        if (startDay!.getTime() <= workdayDateInMs && workdayDateInMs <= endDay!.getTime()) {
            return true;
        }

        return false;
    }));

    const findByIndex = () => {
        const scene = data.scenes.find((scene) => scene.sceneNumber === index);

        if (scene) {
            return [ scene ];
        }

        return data.scenes;
    };

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        if (!(startDay && endDay)) {
            return data.scenes;
        }

        const isStartDayDifference = moment(workdaysDates[ 0 ]).diff(startDay) !== 0;
        const isEndDayDifference = moment(workdaysDates[ workdaysDates.length - 1 ]).diff(endDay) !== 0;

        if (!(isStartDayDifference || isEndDayDifference)) {
            return data.scenes;
        }

        return filterByDateRange();
    };

    return (
        <ScenesContainer>
            <Header>
                <DatePicker
                    reset
                    endDay = { endDay }
                    inputType = 'scenesInputs'
                    projectId = { projectId }
                    setDateRange = { setDateRange }
                    startDay = { startDay }
                />
                <h2>
                    Scenes
                </h2>
                <Button onClick = { () => void push(`/${projectId}/create-scene`) }>
                    Add new scene
                </Button>
            </Header>
            <ScenesTable
                index = { index }
                scenes = { filterHandler() }
                setItemIndex = { setItemIndex }
            />
        </ScenesContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scenes />
    </ErrorBoundary>
);
