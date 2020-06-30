// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

// Types
import { Requisite_requisite } from '../../bus/Requisite';

type PropTypes = Requisite_requisite & { requisiteRedirectHandler: (requisiteId: string) => void };

export const RequisiteTableItem: FC<PropTypes> = ({
    id,
    title,
    description,
    isOrdered,
    pricePerDay,
    requisiteRedirectHandler,
}) => {
    return (
        <Tr onClick = { () => requisiteRedirectHandler(id) }>
            <Td>{id}</Td>
            <Td>{title}</Td>
            <Td>{description}</Td>
            <Td>{isOrdered ? 'Yes' : 'No'}</Td>
            <Td>{`${pricePerDay}`}</Td>
        </Tr>
    );
};
