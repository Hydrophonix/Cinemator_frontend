// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';

// Hooks
import { useProjectDateRange } from '../../hooks';

// Utils
import { transformDateToISO8601 } from '../../utils';

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
    const { projectStartDay, projectEndDay } = useProjectDateRange();
    const { inputs, setDateRangeRedux, setIndexRedux } = useReduxInputs();
    const { dateRange, index } = inputs.scenesInputs;

    const startDay = dateRange.startDay || projectStartDay;
    const endDay = dateRange.endDay || projectEndDay;
    const momentStartDay = moment(transformDateToISO8601(startDay));
    const momentEndDay = moment(transformDateToISO8601(endDay));
    const momentProjectStartDay = moment(transformDateToISO8601(projectStartDay));
    const momentProjectEndDay = moment(transformDateToISO8601(projectEndDay));

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    // const ScenesWithoutWorkdaySort = () => data.scenes.sort((a, b) => a.workdays.length > b.workdays.length ? 1 : -1);

    const filterByDateRange = () => data.scenes.filter((scene) => scene.workdays.some((workday) => {
        const parcedWorkday = moment(workday.date);

        return parcedWorkday.isSameOrAfter(momentStartDay) && parcedWorkday.isSameOrBefore(momentEndDay);
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

        if (momentProjectStartDay.isSame(momentStartDay) && momentProjectEndDay.isSame(momentEndDay)) {
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
                    projectEndDay = { projectEndDay }
                    projectStartDay = { projectStartDay }
                    setDateRange = { setDateRangeRedux }
                    startDay = { startDay }
                />
                <h2>Scenes</h2>
                <Button onClick = { () => void push(`/${projectId}/create-scene`) }>
                    Add new scene
                </Button>
            </Header>
            <div style = {{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <ScenesTable
                    index = { index }
                    scenes = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexRedux({
                        inputType: 'scenesInputs',
                        index:     newIndex,
                    }) }
                />
            </div>
        </ScenesContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Scenes />
    </ErrorBoundary>
);
