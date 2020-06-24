
// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Types
import { PropTypes, Params, EventTypes } from './types';

// Utils
import { transformDateToISO8601 } from '../../utils';
import { customEventView, workdaysDataTransformer } from './utils';

// Styles
import { CalendarContainer } from './styles';

// Instruments
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(ReactBigCalendar);

const Calendar: FC<PropTypes> = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ variables: { input: projectId }});

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const { workdaysDates, events } = workdaysDataTransformer(data);

    const onSelectEventHandler = (event: any) => {
        if (event.action === 'click') {
            const dateISO8601 = transformDateToISO8601(event.start);

            workdaysDates.includes(dateISO8601)
                ? push(`/${projectId}/calendar/${dateISO8601}`)
                : push(`/${projectId}/create-workday/${dateISO8601}`);
        }

        if (event.action === 'select') {
            console.log(event);
        }
    };

    const customDayPropGetter = (date: Date) => {
        if (workdaysDates.includes(transformDateToISO8601(date))) {
            return { className: 'workday' };
        }

        return { className: 'emptyDay' };
    };

    const sceneRedirectHandler = ({ id }: EventTypes) => push(`/${projectId}/scenes/${id}`);

    return (
        <CalendarContainer>
            <DnDCalendar<EventTypes>
                popup
                resizable
                selectable
                components = {{
                    event: customEventView,
                }}
                dayPropGetter = { customDayPropGetter }
                defaultDate = { new Date() }
                defaultView = 'month'
                events = { events }
                localizer = { localizer }
                views = {{ month: true, agenda: true }}
                // onEventDrop = { onEventHandler }
                // onEventResize = { onEventHandler }
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

// const onEventHandler = ({ event, start, end }: DataTypes) => {
//     setEvents((prevEvents) => prevEvents.map((prevEvent) => {
//         if (prevEvent.id === event.id) {
//             return {
//                 ...prevEvent,
//                 start,
//                 end,
//             };
//         }

//         return prevEvent;
//     }));
// };
