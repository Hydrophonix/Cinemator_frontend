// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, SceneTableItem } from '../../components';

// Elements
import { Button } from '../../elements';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';

// Styles
import { TableStyles } from '../../assets';
import { ScenesContainer } from './styles';

const scenesMock = [
    {
        id:           '1',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  1,
        workdayIds:   [ '1wd' ],
    },
    {
        id:           '2',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  2,
        workdayIds:   [ '1wd' ],
    },
];

// Types
type PropTypes = {}

const scenesThNames = [ '#', 'Scene name', 'Location', 'Date', 'Requisite' ];

const Scenes: FC<PropTypes> = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    const { data, loading } = useScenesQuery({ variables: { input: projectId }});

    console.log('loading', loading);
    console.log('data', data);

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    return (
        <ScenesContainer>
            <header>
                <section>
                    <DatePicker
                        selectsStart
                        endDate = { endDate }
                        selected = { startDate }
                        startDate = { startDate }
                        onChange = { (date) => date && setStartDate(date) }
                    />
                    <DatePicker
                        selectsEnd
                        endDate = { endDate }
                        minDate = { startDate }
                        selected = { endDate }
                        startDate = { startDate }
                        onChange = { (date) => date && setEndDate(date) }
                    />
                    <input
                        placeholder = 'Scene name'
                        type = 'text'
                    />
                    <input
                        type = 'number'
                    />
                    <input
                        placeholder = 'Scene location'
                        type = 'text'
                    />
                </section>

                <Button onClick = { () => push(`/${projectId}/create-scene`) }>Add new scene</Button>
            </header>
            <TableStyles>
                <Table>
                    <TableHead ThNames = { scenesThNames } />
                    <Tbody>
                        {
                            scenesMock.map((scene) => (
                                <SceneTableItem
                                    key = { scene.id }
                                    { ...scene }
                                    sceneRedirectHandler = { sceneRedirectHandler }
                                />
                            ))
                        }
                    </Tbody>
                </Table>
            </TableStyles>
        </ScenesContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scenes />
    </ErrorBoundary>
);
