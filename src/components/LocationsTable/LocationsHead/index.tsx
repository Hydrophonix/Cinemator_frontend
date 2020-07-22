// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ThemeContext } from 'styled-components';
// import { useHistory, useParams } from 'react-router-dom';

// Elements
// import { Button } from '../../../elements';

type PropTypes = {}

type Params = { projectId: string };

export const LocationsHead: FC<PropTypes> = () => {
    // const theme = useContext(ThemeContext);
    // const { push } = useHistory();
    // const { projectId } = useParams<Params>();

    return (
        <Thead>
            <Tr className = 'locationsTableHead'>
                <Th style = {{ textAlign: 'center' }}>
                    Name
                </Th>
                <Th style = {{ textAlign: 'center' }}>
                    Actions
                </Th>
            </Tr>
        </Thead>
    );
};
