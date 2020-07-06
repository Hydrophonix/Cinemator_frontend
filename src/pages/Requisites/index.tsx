// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Components
import { ErrorBoundary, TableHead } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { RequisiteContainer } from './styles';

// Instruments
import { BLUE } from '../../assets/globalStyles';

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const requisiteRedirectHandler = (requisiteId: string) => push(`/${projectId}/requisites/${requisiteId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <RequisiteContainer>
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
                        placeholder = 'Requisite name'
                        type = 'text'
                    />
                    <input
                        type = 'number'
                    />
                </section>

                <button onClick = { () => push(`/${projectId}/create-requisite`) }>Add new requisite</button>
            </header>
            <TableStyles>
                <Table>
                    <TableHead
                        className = 'requisitesTableHead'
                        ThNames = { [ '#', 'Title', 'Scenes', 'isOrdered', 'pricePerDay' ] }
                    />
                    <Tbody>
                        {
                            data.requisites.map(({ id, title, scenes, isOrdered, pricePerDay }) => (
                                <Tr
                                    className = 'requisitesTableRow'
                                    key = { id }
                                    onClick = { () => requisiteRedirectHandler(id) }>
                                    <Td>{1}</Td>
                                    <Td>{title}</Td>
                                    <Td>
                                        {
                                            scenes.map((scene, index) => (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: BLUE.secondary,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = {
                                                        (event) => sceneRedirectHandler(event, scene.id)
                                                    }>
                                                    S:{`${scene.sceneNumber}`}
                                                </Button>
                                            ))
                                        }
                                    </Td>
                                    <Td>{isOrdered ? 'Yes' : 'No'}</Td>
                                    <Td>{pricePerDay || ' Free'}</Td>
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
