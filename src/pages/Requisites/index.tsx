// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Table, Tbody } from 'react-super-responsive-table';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Components
import { ErrorBoundary, TableHead, RequisiteTableItem } from '../../components';

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

const requisitesThNames = [ 'ID', 'Name', 'Scenes', 'isOrdered', 'pricePerDay' ];

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();
    const { data, loading } = useRequisitesQuery({ variables: { input: projectId }});
    console.log('Requisites', data);

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const requisiteRedirectHandler = (requisiteId: string) => push(`/${projectId}/requisites/${requisiteId}`);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

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
                    <TableHead ThNames = { requisitesThNames } />
                    <Tbody>
                        {
                            requisitesMock.map((requisite) => (
                                <RequisiteTableItem
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
