// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';

// Components
import { RequisiteItem } from './RequisiteItem';
import { ErrorBoundary } from '../../components';

// Styles
import { TableStyles } from '../../assets';
import { RequisiteContainer } from './styles';

const requisitesMock = [
    {
        id:              '234234234',
        requisiteName:   'Mouse',
        requisiteNumber: 1,
        scenesIds:       [ '324423423', '3244dd23423' ],
        isOrdered:       false,
        photoUrl:        'https://cdn.mos.cms.futurecdn.net/2RD5zcvSuFmWTrTLqUNbmn-320-80.jpg',
        description:     'nice mouse',
        pricePerDay:     0,
    },
    {
        id:              '234d234234',
        requisiteName:   'Mouse',
        requisiteNumber: 2,
        scenesIds:       [ '324423423', '3244dd23423' ],
        isOrdered:       false,
        photoUrl:        'https://cdn.mos.cms.futurecdn.net/2RD5zcvSuFmWTrTLqUNbmn-320-80.jpg',
        description:     'nice mouse',
        pricePerDay:     0,
    },
];

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const requisiteRedirectHandler = (requisiteId: string) => push(`/${projectId}/requisites/${requisiteId}`);

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

                <button>Add new requisite</button>
            </header>
            <TableStyles>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Number</Th>
                            <Th>Name</Th>
                            <Th>Scenes</Th>
                            <Th>isOrdered</Th>
                            <Th>pricePerDay</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            requisitesMock.map((requisite) => (
                                <RequisiteItem
                                    key = { requisite.id }
                                    { ...requisite }
                                    requisiteRedirectHandler = { requisiteRedirectHandler }
                                />
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
