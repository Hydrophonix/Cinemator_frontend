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
import { ScenesContainer, Header } from './styles';

// Instruments
import { GREEN, ORANGE } from '../../assets/globalStyles';

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();
    const { data, loading } = useScenesQuery({ projectId });
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);
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
            <Header>
                <section>
                    <nav>
                        <DatePicker
                            selectsStart
                            endDate = { endDate }
                            selected = { startDate }
                            startDate = { startDate }
                            onChange = { (date) => date && void setStartDate(date) }
                        />
                        <DatePicker
                            selectsEnd
                            endDate = { endDate }
                            minDate = { startDate }
                            selected = { endDate }
                            startDate = { startDate }
                            onChange = { (date) => date && void setEndDate(date) }
                        />
                    </nav>
                    <nav>
                        <input
                            type = 'number'
                            value = { 0 }
                        />
                        <input
                            placeholder = 'Location'
                            type = 'text'
                        />
                    </nav>
                </section>
                <h2>Scenes</h2>
                <Button onClick = { () => void push(`/${projectId}/create-scene`) }>Add new scene</Button>
            </Header>
            <TableStyles>
                <Table>
                    <TableHead
                        className = 'scenesTableHead'
                        ThNames = { [ '#', 'Location', 'Workdays', 'Requisites' ] }
                    />
                    <Tbody>
                        {
                            data.scenes.map(({ id, sceneNumber, location, workdays, requisites }) => (
                                <Tr
                                    className = 'scenesTableRow'
                                    key = { id }
                                    onClick = { () => void sceneRedirectHandler(id) }>
                                    <Td>{`${sceneNumber}`}</Td>
                                    <Td>{location}</Td>
                                    <Td>
                                        {
                                            workdays.map((workday, index) => (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: GREEN.main,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = { (event) => void workdayRedirectHandler(
                                                        event, workday.id,
                                                    ) }>
                                                    {workday.date}
                                                </Button>
                                            ))
                                        }
                                    </Td>
                                    <Td>
                                        {
                                            requisites.map((requisite, index) => (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: ORANGE.secondary,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = { (event) => void requisiteRedirectHandler(
                                                        event, requisite.id,
                                                    ) }>
                                                    {`#:${index}`}
                                                </Button>
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
