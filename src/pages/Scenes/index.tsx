// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';

// Components
import { ErrorBoundary, TableHead } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { ScenesContainer } from './styles';

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();
    const { data, loading } = useScenesQuery({ projectId });
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);
    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };
    const requisiteRedirectHandler = (event: any, requisiteId: string) => {
        event.stopPropagation();
        push(`/${projectId}/requisites/${requisiteId}`);
    };

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
                    <TableHead ThNames = { [ '#', 'Location', 'Workdays', 'Requisites' ] } />
                    <Tbody>
                        {
                            data.scenes.map(({ id, sceneNumber, location, workdays, requisites }) => (
                                <Tr
                                    key = { id }
                                    onClick = { () => sceneRedirectHandler(id) }>
                                    <Td>{`${sceneNumber}`}</Td>
                                    <Td>{location}</Td>
                                    <Td>
                                        {
                                            workdays.map((workday, index) => (
                                                <div
                                                    key = { index }
                                                    onClick = { (event) => workdayRedirectHandler(
                                                        event, workday.id,
                                                    ) }>
                                                    {workday.date}
                                                </div>
                                            ))
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            requisites.map((requisite, index) => (
                                                <div
                                                    key = { index }
                                                    onClick = { (event) => requisiteRedirectHandler(
                                                        event, requisite.id,
                                                    ) }>
                                                    {`#:${index}`}
                                                </div>
                                            ))
                                        }
                                    </Td>
                                </Tr>
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
