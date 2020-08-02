// Core
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

// Redux
import { useInputsRedux } from '../../../@init/redux/inputs';

// Components
import { WorkdaysTable, DateRangePicker } from '../../../components';

// Elements
import { Button } from '../../../elements';

// Utils
import { transformDateToISO8601 } from '../../../utils';

// Types
import { PropTypes, Params } from '../types';

// Styles
import { Container, Header, ScrollList } from './styles';

export const Table: FC<PropTypes> = ({ data }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { inputs: { workdaysInputs }, setWorkdaysDateRangeRedux } = useInputsRedux();

    const workdaysDates = data.workdays.map((workday) => new Date(workday.date));

    const projectStartDay = workdaysDates[ 0 ] || new Date();
    const projectEndDay = workdaysDates[ workdaysDates.length - 1 ] || new Date();
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
                <nav>
                    <DateRangePicker
                        reset
                        endDay = { endDay }
                        firstPopperPlacement = 'top-start'
                        projectEndDay = { projectEndDay }
                        projectStartDay = { projectStartDay }
                        setDateRange = { setWorkdaysDateRangeRedux }
                        startDay = { startDay }
                    />
                </nav>
                <h2>Workdays</h2>
                <nav>
                    <Button
                        title = 'Create workday'
                        onClick = { () => void push(`/${projectId}/create-workday/new-date`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 50, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            <ScrollList>
                <WorkdaysTable workdays = { filterByDateRange() } />
            </ScrollList>
        </Container>
    );
};
