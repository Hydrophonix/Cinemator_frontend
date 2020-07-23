// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';
import { useLocationsQuery } from '../../bus/Location';

// Hooks
import { useProjectDateRange } from '../../hooks';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, DateRangePicker, ScenesTable, LocationsModal } from '../../components';

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
    const { data: locationsData, loading: locationsLoading } = useLocationsQuery({ projectId });
    const { projectStartDay, projectEndDay } = useProjectDateRange();
    const { inputs, setDateRangeRedux, setIndexRedux, setScenesLocationRedux } = useInputsRedux();
    const { dateRange, index, location } = inputs.scenesInputs;

    const startDay = dateRange.startDay || projectStartDay;
    const endDay = dateRange.endDay || projectEndDay;
    const momentStartDay = moment(transformDateToISO8601(startDay));
    const momentEndDay = moment(transformDateToISO8601(endDay));
    const momentProjectStartDay = moment(transformDateToISO8601(projectStartDay));
    const momentProjectEndDay = moment(transformDateToISO8601(projectEndDay));

    if (loading || !data || locationsLoading || !locationsData) {
        return <div>Loading...</div>;
    }


    const setScenesLocationHandler = (loactionId: string) => {
        const findedLocation = locationsData.locations.find((location) => location.id === loactionId);

        if (findedLocation) {
            setScenesLocationRedux(findedLocation.name);
            push(`/${projectId}/scenes`);
        }
    };

    const findByIndex = () => {
        const scene = data.scenes.find((scene) => scene.number === index);

        if (scene) {
            return [ scene ];
        }

        return data.scenes;
    };

    const findByLocation = () => {
        return data.scenes.filter(
            (scene) => scene.locations.some(
                (someLocation) => someLocation.name.toLocaleLowerCase().includes(location.toLocaleLowerCase()),
            ),
        );
    };

    const filterByDateRange = () => data.scenes.filter((scene) => scene.workdays.some((workday) => {
        const parcedWorkday = moment(workday.date);

        return parcedWorkday.isSameOrAfter(momentStartDay) && parcedWorkday.isSameOrBefore(momentEndDay);
    }));

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        if (location !== '') {
            return findByLocation();
        }

        if (momentProjectStartDay.isSame(momentStartDay) && momentProjectEndDay.isSame(momentEndDay)) {
            return data.scenes;
        }

        return filterByDateRange();
    };

    return (
        <ScenesContainer>
            <Route path = { '/:projectId/scenes/locations' }>
                <LocationsModal
                    closeHandler = { () => void push(`/${projectId}/scenes`) }
                    handler = { setScenesLocationHandler }
                />
            </Route>
            <Header>
                <DateRangePicker
                    reset
                    endDay = { endDay }
                    firstPopperPlacement = 'top-start'
                    projectEndDay = { projectEndDay }
                    projectStartDay = { projectStartDay }
                    setDateRange = { setDateRangeRedux }
                    startDay = { startDay }
                />
                <h2>Scenes</h2>
                <Button
                    title = 'Create scene'
                    onClick = { () => void push(`/${projectId}/create-scene`) }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'plus'
                        style = {{
                            width:  16,
                            height: 16,
                        }}
                    />
                </Button>
            </Header>
            <div style = {{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <ScenesTable
                    index = { index }
                    location = { location }
                    scenes = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexRedux({
                        inputType: 'scenesInputs',
                        index:     newIndex,
                    }) }
                    setLocation = { (location: string) => setScenesLocationRedux(location) }
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
