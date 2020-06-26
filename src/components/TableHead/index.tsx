// Core
import React, { FC } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';

type PropTypes = {
    ThNames: String[]
}

export const TableHead: FC<PropTypes> = ({ ThNames }) => {
    return (
        <Thead>
            <Tr>
                {
                    ThNames.map((ThName) => <Th>{ThName}</Th>)
                }
            </Tr>
        </Thead>
    );
};
