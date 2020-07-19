// Core
import React, { FC } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';

type PropTypes = {}

export const WorkdaysHead: FC<PropTypes> = () => {
    return (
        <Thead>
            <Tr className = 'workdaysTableHead'>
                <Th style = {{ textAlign: 'center' }}>Date</Th>
                <Th>Scenes</Th>
            </Tr>
        </Thead>
    );
};
