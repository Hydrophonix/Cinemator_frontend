// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';
import { useLocationsQuery } from '../../bus/Location';

// Hooks
import { useProjectDateRange } from '../../hooks';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';
import { useInputsRedux } from '../../@init/redux/inputs';

// Components
import { LocationsModal } from '../../containers';

// Components
import { ErrorBoundary, DateRangePicker, ScenesTable } from '../../components';

// Elements
import { Button, Spinner } from '../../elements';

// Styles
import { Container, Header, ScrollList } from './styles';

// Types
type Params = { projectId: string };

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const { data } = useScenesQuery({ projectId });
    const { data: locationsData } = useLocationsQuery({ projectId });
    const {
        inputs: { scenesInputs: { index, location, dateRange }},
        setScenesDateRangeRedux, setIndexRedux, setScenesLocationRedux,
    } = useInputsRedux();
    const {
        startDay, endDay, projectStartDay, projectEndDay,
        isDefaultProjectDateRange, isDateIncludesDateRangeHandler,
    } = useProjectDateRange({ dateRange });

    if (!data || !locationsData) {
        return <Spinner />;
    }

    const setScenesLocationHandler = (locationId: string) => {
        const findedLocation = locationsData.locations.find((location) => location.id === locationId);

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

    const filterByDateRange = () => data.scenes.filter(
        (scene) => scene.workdays.some((workday) => isDateIncludesDateRangeHandler(workday.date)),
    );

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        if (location !== '') {
            return findByLocation();
        }

        if (isDefaultProjectDateRange) {
            return data.scenes;
        }

        return filterByDateRange();
    };

    return (
        <Container>
            <Route path = { '/:projectId/scenes/locations' }>
                <LocationsModal
                    closeHandler = { () => void push(`/${projectId}/scenes`) }
                    handler = { setScenesLocationHandler }
                />
            </Route>
            <Header>
                <nav>
                    <DateRangePicker
                        reset
                        endDay = { endDay }
                        firstPopperPlacement = 'top-start'
                        projectEndDay = { projectEndDay }
                        projectStartDay = { projectStartDay }
                        setDateRange = { setScenesDateRangeRedux }
                        startDay = { startDay }
                    />
                </nav>
                <h2>Scenes</h2>
                <nav>
                    <Button
                        disabled = { !isOnline }
                        title = 'Create scene'
                        onClick = { () => void push(`/${projectId}/create-scene`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 50, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            <ScrollList heightDiff = { 35 }>
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
            </ScrollList>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Scenes />
    </ErrorBoundary>
);
