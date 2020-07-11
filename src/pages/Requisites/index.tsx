// Core
import React, { useState, FC, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Components
import { ErrorBoundary, TableHead } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { RequisiteContainer, Header } from './styles';

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const requisiteRedirectHandler = (requisiteId: string) => void push(`/${projectId}/requisites/${requisiteId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <RequisiteContainer>
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
                        />
                        <input
                            placeholder = 'Title'
                            type = 'text'
                        />
                    </nav>
                </section>
                <h2>Requisites</h2>
                <button onClick = { () => void push(`/${projectId}/create-requisite`) }>Add new requisite</button>
            </Header>
            <TableStyles>
                <Table>
                    <TableHead
                        className = 'requisitesTableHead'
                        ThNames = { [ '#', 'Title', 'Scenes' ] }
                    />
                    <Tbody>
                        {
                            data.requisites.map(({ id, title, scenes }) => (
                                <Tr
                                    className = 'requisitesTableRow'
                                    key = { id }
                                    onClick = { () => void requisiteRedirectHandler(id) }>
                                    <Td>{1}</Td>
                                    <Td>{title}</Td>
                                    <Td>
                                        {
                                            scenes.map((scene, index) => (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: theme.scene.secondary,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = {
                                                        (event) => void sceneRedirectHandler(event, scene.id)
                                                    }>
                                                    S:{`${scene.sceneNumber}`}
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
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisites />
    </ErrorBoundary>
);
