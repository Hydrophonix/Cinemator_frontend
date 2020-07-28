// Core
import React, { FC } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';

export const LocationsHead: FC = () => {
    return (
        <Thead>
            <Tr className = 'locationsTableHead'>
                <Th style = {{ textAlign: 'center' }}>
                    Location
                </Th>
                <Th style = {{ textAlign: 'center' }}>
                    Actions
                </Th>
            </Tr>
        </Thead>
    );
};
