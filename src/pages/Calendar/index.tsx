
// Core
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Types
import { PropTypes, Params, EventTypes } from './types';

// Utils
import { transformDateToISO8601 } from '../../utils';
import { customEventView, customToolbarView, workdaysDataTransformer } from './utils';

// Styles
import { CalendarContainer } from './styles';

// Instruments
const localizer = momentLocalizer(moment);

const Calendar: FC<PropTypes> = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const events = workdaysDataTransformer(data);

    const onSelectEventHandler = (event: any) => {
        const dateISO8601 = transformDateToISO8601(event.start);
        const workday = data.workdays.find((workday) => workday.date === dateISO8601);

        if (event.action === 'click') {
            workday
                ? push(`/${projectId}/calendar/${workday.id}`)
                : push(`/${projectId}/create-workday/${dateISO8601}`);
        }

        if (event.action === 'select') {
            // TODO: fix on desctop
            workday
                ? push(`/${projectId}/calendar/${workday.id}`)
                : push(`/${projectId}/create-workday/${dateISO8601}`);
        }
    };

    const customDayPropGetter = (date: Date) => {
        const workday = data.workdays.find((workday) => workday.date === transformDateToISO8601(date));
        const className = `${transformDateToISO8601(date) === transformDateToISO8601(new Date()) && 'todayInsetShadow'}`;

        if (!workday) {
            return { className: className + ' emptyDay' };
        }

        return { className: className + ' workday' };
    };

    const sceneRedirectHandler = ({ id }: EventTypes) => push(`/${projectId}/scenes/${id}`);

    return (
        <CalendarContainer>
            <ReactBigCalendar<EventTypes>
                popup
                selectable
                components = {{
                    event:   customEventView,
                    toolbar: customToolbarView,
                }}
                dayPropGetter = { customDayPropGetter }
                defaultDate = { new Date() }
                defaultView = 'month'
                events = { events }
                localizer = { localizer }
                views = {{ month: true, agenda: true }}
                onSelectEvent = { sceneRedirectHandler }
                onSelectSlot = { onSelectEventHandler }
            />
        </CalendarContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Calendar />
    </ErrorBoundary>
);
