// Core
import React, { FC } from 'react';

// Styles
import { Thead } from '../styles';

export const LocationsHead: FC = () => {
    return (
        <Thead>
            <tr>
                <th>Location</th>
                <th>Actions</th>
            </tr>
        </Thead>
    );
};
