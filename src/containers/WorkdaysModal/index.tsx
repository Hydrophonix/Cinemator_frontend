
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import moment from 'moment';

// Components
import { Modal, WorkdaysTable, DateRangePicker } from '../../components';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Elements
import { ModalHeader, Button } from '../../elements';

import { transformDateToISO8601 } from '../../utils';

// Styles
import { Main, Footer, Section } from './styles';

// Types
import { DateRange } from '../../@init/redux/inputs/types';

type Params = {
    projectId: string
}

type PropTypes = {
    closeHandler: () => void
    workdayIds?: Array<string>
    handler?: (sceneId: string) => void
    saveHandler?: Function
    saveHandlerLoading?: boolean
}

export const WorkdaysModal: FC<PropTypes> = ({
    closeHandler, workdayIds, handler, saveHandler, saveHandlerLoading,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useWorkdaysQuery({ projectId });
    const workdaysDates = data?.workdays.map((workday) => new Date(workday.date));
    const [ dateRange, setDateRange ] = useState<{ startDay?: Date, endDay?: Date}>({
        startDay: void 0,
        endDay:   void 0,
    });

    if (loading || !data || !workdaysDates) {
        return null;
    }

    const projectStartDay = workdaysDates[ 0 ] || new Date();
    const projectEndDay = workdaysDates[ workdaysDates.length - 1 ] || new Date();
    const startDay = dateRange.startDay || projectStartDay;
    const endDay = dateRange.endDay || projectEndDay;
    const momentStartDay = moment(transformDateToISO8601(startDay));
    const momentEndDay = moment(transformDateToISO8601(endDay));
    const momentProjectStartDay = moment(transformDateToISO8601(projectStartDay));
    const momentProjectEndDay = moment(transformDateToISO8601(projectEndDay));

    const filterByDateRange = () => {
        if (momentProjectStartDay.isSame(momentStartDay) && momentProjectEndDay.isSame(momentEndDay)) {
            return data.workdays;
        }

        return data.workdays.filter((workday) => {
            const momentWorkday = moment(workday.date);

            return momentWorkday.isSameOrAfter(momentStartDay) && momentWorkday.isSameOrBefore(momentEndDay);
        });
    };

    return (
        <Modal
            closeHandler = { closeHandler }
            spinner = { saveHandlerLoading }>
            <ModalHeader style = {{ backgroundColor: theme.workday.secondary }}>Workdays</ModalHeader>
            <Section>
                <DateRangePicker
                    reset
                    endDay = { endDay }
                    projectEndDay = { projectEndDay }
                    projectStartDay = { projectStartDay }
                    setDateRange = { (payload: DateRange) => void setDateRange({ ...dateRange, ...payload }) }
                    startDay = { startDay }
                />
            </Section>
            <Main>
                <WorkdaysTable
                    handler = { handler }
                    workdayIds = { workdayIds }
                    workdays = { filterByDateRange() }
                />
            </Main>
            <Footer>
                <Button
                    title = 'Save'
                    onClick = { () => saveHandler && void saveHandler() }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'save'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Modal>
    );
};
