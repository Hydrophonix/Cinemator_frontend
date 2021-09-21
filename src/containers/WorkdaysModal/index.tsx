
// Core
import React, { FC, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, WorkdaysTable, DateRangePicker } from '../../components';

// Apollo
import { useWorkdaysQuery } from '../../bus/Workday';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useProjectDateRange } from '../../hooks';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

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
    const [ dateRange, setDateRange ] = useState<{ startDay?: Date, endDay?: Date}>({
        startDay: void 0,
        endDay:   void 0,
    });
    const {
        startDay, endDay, projectStartDay, projectEndDay,
        isDefaultProjectDateRange, isDateIncludesDateRangeHandler,
    } = useProjectDateRange({ dateRange });

    if (!data) {
        return null;
    }

    const filterByDateRange = () => {
        if (isDefaultProjectDateRange) {
            return data.workdays;
        }

        return data.workdays.filter((workday) => isDateIncludesDateRangeHandler(workday.date));
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
