// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

// Types
type PropTypes = {
    id: string
    requisiteNumber: number
    requisiteName: string
    scenesIds: Array<string>
    isOrdered: boolean
    pricePerDay: number
    requisiteRedirectHandler: (requisiteId: string) => void
};

export const RequisiteTableItem: FC<PropTypes> = ({
    id,
    requisiteNumber,
    requisiteName,
    scenesIds,
    isOrdered,
    pricePerDay,
    requisiteRedirectHandler,
}) => {
    return (
        <Tr onClick = { () => requisiteRedirectHandler(id) }>
            <Td>{id}</Td>
            <Td>{requisiteNumber}</Td>
            <Td>{requisiteName}</Td>
            <Td>Items: {scenesIds.length}</Td>
            <Td>{isOrdered ? 'Yes' : 'No'}</Td>
            <Td>{`${pricePerDay}`}</Td>
        </Tr>
    );
};
