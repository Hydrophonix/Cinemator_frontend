// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { WorkdaysHead } from './WorkdaysHead';
import { WorkdaysBody } from './WorkdaysBody';

// Styles
import { TableStyles } from '../../assets';
import { Workdays_workdays } from '../../bus/Workday';

type PropTypes = {
    workdays: Workdays_workdays[]
}

export const WorkdaysTable: FC<PropTypes> = ({ workdays }) => {
    return (
        <TableStyles>
            <Table>
                <WorkdaysHead />
                <WorkdaysBody
                    workdays = { workdays }
                />
            </Table>
        </TableStyles>
    );
};
