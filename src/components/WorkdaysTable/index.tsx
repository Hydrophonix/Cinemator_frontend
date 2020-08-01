// Core
import React, { FC } from 'react';

// Components
import { WorkdaysHead } from './WorkdaysHead';
import { WorkdaysBody } from './WorkdaysBody';

// Styles
import { Table } from './styles';
import { Workdays_workdays } from '../../bus/Workday';

type PropTypes = {
    workdays: Workdays_workdays[]
    workdayIds?: Array<string>
    handler?: (workdayId: string) => void
}

export const WorkdaysTable: FC<PropTypes> = ({ workdays, workdayIds, handler }) => {
    return (
        <Table>
            <WorkdaysHead />
            <WorkdaysBody
                handler = { handler }
                workdayIds = { workdayIds }
                workdays = { workdays }
            />
        </Table>
    );
};
