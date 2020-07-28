// Core
import React, { FC } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';

export const ReqTypesHead: FC = () => {
    return (
        <Thead>
            <Tr className = 'reqTypesTableHead'>
                <Th style = {{ textAlign: 'center' }}>
                    Type
                </Th>
                <Th style = {{ textAlign: 'center' }}>
                    Actions
                </Th>
            </Tr>
        </Thead>
    );
};
