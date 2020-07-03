// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

// Types
import { Requisite_requisite } from '../../bus/Requisite';

type PropTypes = Omit<Requisite_requisite, 'projectId'> & {
    onClickHandler?: Function
    isActive?: boolean
};

export const RequisiteTableItem: FC<PropTypes> = ({
    id,
    title,
    description,
    isOrdered,
    pricePerDay,
    onClickHandler,
    isActive,
}) => {
    return (
        <Tr
            style = { isActive ? { backgroundColor: 'lightgreen' } : {} }
            onClick = { onClickHandler ? onClickHandler : () => void 0 }>
            <Td>{id}</Td>
            <Td>{title}</Td>
            <Td>{description}</Td>
            <Td>{isOrdered ? 'Yes' : 'No'}</Td>
            <Td>{`${pricePerDay}`}</Td>
        </Tr>
    );
};
