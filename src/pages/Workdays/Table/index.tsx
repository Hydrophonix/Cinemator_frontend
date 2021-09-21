// Core
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux
import { useInputsRedux } from '../../../@init/redux/inputs';
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Components
import { WorkdaysTable, DateRangePicker } from '../../../components';

// Elements
import { Button } from '../../../elements';

// Hooks
import { useProjectDateRange } from '../../../hooks';

// Types
import { PropTypes, Params } from '../types';

// Styles
import { Container, Header, ScrollList } from './styles';

export const Table: FC<PropTypes> = ({ data }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const {
        inputs: { workdaysInputs: { dateRange }},
        setWorkdaysDateRangeRedux,
    } = useInputsRedux();
    const {
        startDay, endDay, projectStartDay, projectEndDay,
        isDefaultProjectDateRange, isDateIncludesDateRangeHandler,
    } = useProjectDateRange({ dateRange });

    const filterByDateRange = () => {
        if (isDefaultProjectDateRange) {
            return data.workdays;
        }

        return data.workdays.filter((workday) => isDateIncludesDateRangeHandler(workday.date));
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
                        disabled = { !isOnline }
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
            <ScrollList heightDiff = { 35 }>
                <WorkdaysTable workdays = { filterByDateRange() } />
            </ScrollList>
        </Container>
    );
};
