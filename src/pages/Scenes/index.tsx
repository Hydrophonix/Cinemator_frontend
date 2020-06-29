// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Tbody } from 'react-super-responsive-table';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';

// Components
import { ErrorBoundary, TableHead, SceneTableItem } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { ScenesContainer } from './styles';

const scenesThNames = [ '#', 'Scene name', 'Location', 'Date', 'Requisite', 'Actions' ];

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    const { data, loading } = useScenesQuery({ variables: { input: projectId }});
    console.log('Scenes', data);

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

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
                            data.scenes.map((scene) => (
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
