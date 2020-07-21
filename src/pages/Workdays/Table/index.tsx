
// Core
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

// Redux
import { useInputsRedux } from '../../../@init/redux/inputs';

// Components
import { WorkdaysTable, DatePicker } from '../../../components';

// Elements
import { Button } from '../../../elements';

// Utils
import { transformDateToISO8601 } from '../../../utils';

// Types
import { PropTypes, Params } from '../types';

// Styles
import { Container, Header } from './styles';

export const Table: FC<PropTypes> = ({ data }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { inputs: { workdaysInputs }, setWorkdaysDateRangeRedux } = useInputsRedux();

    const workdaysDates = data.workdays.map((workday) => new Date(workday.date));

    const projectStartDay = workdaysDates[ 0 ];
    const projectEndDay = workdaysDates[ workdaysDates.length - 1 ];
    const startDay = workdaysInputs.dateRange.startDay || projectStartDay;
    const endDay = workdaysInputs.dateRange.endDay || projectEndDay;
    const momentStartDay = moment(transformDateToISO8601(startDay));
    const momentEndDay = moment(transformDateToISO8601(endDay));
    const momentProjectStartDay = moment(transformDateToISO8601(projectStartDay));
    const momentProjectEndDay = moment(transformDateToISO8601(projectEndDay));

    const filterByDateRange = () => {
        if (momentProjectStartDay.isSame(momentStartDay) && momentProjectEndDay.isSame(momentEndDay)) {
            return data.workdays;
        }

        return data.workdays.filter((workday) => {
            const parcedWorkday = moment(workday.date);

            return parcedWorkday.isSameOrAfter(momentStartDay) && parcedWorkday.isSameOrBefore(momentEndDay);
        });
    };

    return (
        <Container>
            <Header>
                <DatePicker
                    reset
                    endDay = { endDay }
                    projectEndDay = { projectEndDay }
                    projectStartDay = { projectStartDay }
                    setDateRange = { setWorkdaysDateRangeRedux }
                    startDay = { startDay }
                />
                <h2>Workdays</h2>
                <Button
                    disabled
                    onClick = { () => void push(`/${projectId}/create-workday/new-date`) }>
                    Add new workday
                </Button>
            </Header>
            <div style = {{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <WorkdaysTable
                    workdays = { filterByDateRange() }
                />
            </div>
        </Container>
    );
};
