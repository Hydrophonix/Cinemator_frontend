
// Core
import React, { FC, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import moment from 'moment';

// Components
import { Modal, WorkdaysTable, DateRangePicker } from '../../components';

// Apollo
import { useWorkdaysQuery } from '../../bus/Workday';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { Header, Footer, Section } from './styles';

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
    const headerRef = useRef<HTMLElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const { data } = useWorkdaysQuery({ projectId });
    const workdaysDates = data?.workdays.map((workday) => new Date(workday.date));
    const [ dateRange, setDateRange ] = useState<{ startDay?: Date, endDay?: Date}>({
        startDay: void 0,
        endDay:   void 0,
    });

    if (!data || !workdaysDates) {
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
            <Header ref = { headerRef }><h2>Workdays</h2></Header>
            <Section ref = { sectionRef }>
                <DateRangePicker
                    reset
                    endDay = { endDay }
                    projectEndDay = { projectEndDay }
                    projectStartDay = { projectStartDay }
                    setDateRange = { (payload: DateRange) => void setDateRange({ ...dateRange, ...payload }) }
                    startDay = { startDay }
                />
            </Section>
            <AdaptiveScroll
                minHeight
                backgroundColor = { theme.workday.containerBg }
                refs = { [ headerRef, sectionRef, footerRef ] }>
                <WorkdaysTable
                    handler = { handler }
                    workdayIds = { workdayIds }
                    workdays = { filterByDateRange() }
                />
            </AdaptiveScroll>
            <Footer ref = { footerRef }>
                <Button
                    disabled = { !isOnline }
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
