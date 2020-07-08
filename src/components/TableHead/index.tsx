// Core
import React, { FC } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';

type PropTypes = {
    ThNames: String[]
    className: string
}

export const TableHead: FC<PropTypes> = ({ ThNames, className }) => {
    return (
        <Thead>
            <Tr className = { className }>
                { ThNames.map((ThName, index) => <Th key = { index }>{ThName}</Th>) }
            </Tr>
        </Thead>
    );
};
