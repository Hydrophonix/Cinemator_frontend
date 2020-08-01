// Core
import React, { FC } from 'react';
import { Thead } from '../styles';

type PropTypes = {}

export const WorkdaysHead: FC<PropTypes> = () => {
    return (
        <Thead>
            <tr>
                <th style = {{ textAlign: 'center' }}>Date</th>
                <th>Scenes</th>
            </tr>
        </Thead>
    );
};
