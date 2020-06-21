
// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { Calendar as ReactBigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Types
import { PropTypes, Params, EventTypes, DataTypes } from './types';

// Components
import { ErrorBoundary } from '../../components';

// // Elements
// import { Button } from '../../elements';

// Styles
import { CalendarContainer } from './styles';


// Instruments
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(ReactBigCalendar);

const Calendar: FC<PropTypes> = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();

    const [ events, setEvents ] = useState<EventTypes[]>([
        {
            start: new Date(),
            end:   new Date(),
            title: 'Scene 1',
            url:   'http://google.com/',
            id:    '1',
        },
        // {
        //     start: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
        //     end:   new Date(),
        //     title: 'Scene 1',
        //     url:   'http://google.com/',
        //     id:    '1',
        // },
        {
            start: new Date(),
            end:   new Date(),
            title: 'Scene 2',
            url:   'http://google.com/',
            id:    '2',
        },
        {
            start: new Date(),
            end:   new Date(),
            title: 'Scene 3',
            url:   'http://google.com/',
            id:    '3',
        },
        {
            start: new Date(),
            end:   new Date(),
            title: 'Scene 4',
            url:   'http://google.com/',
            id:    '4',
        },
    ]);

    const scenesRedirectHandler = (event: any) => {
        console.log('scenesRedirectHandler -> e', event);

        // push(`/${projectId}/scenes/`);
    };

    const sceneRedirectHandler = ({ id }: EventTypes) => push(`/${projectId}/scenes/${id}`);

    const onEventHandler = ({ event, start, end }: DataTypes) => {
        setEvents((prevEvents) => prevEvents.map((prevEvent) => {
            if (prevEvent.id === event.id) {
                return {
                    ...prevEvent,
                    start,
                    end,
                };
            }

            return prevEvent;
        }));
    };

    return (
        <CalendarContainer>
            <DnDCalendar
                resizable
                selectable
                defaultDate = { new Date() }
                defaultView = 'month'
                events = { events }
                localizer = { localizer }
                onEventDrop = { onEventHandler }
                onEventResize = { onEventHandler }
                onSelectEvent = { sceneRedirectHandler }
                onSelectSlot = { scenesRedirectHandler }
            />
        </CalendarContainer>
    );
};

// export interface withDragAndDropProps<TEvent extends object = Event> {
//     onEventDrop?: (args: { event: TEvent, start: stringOrDate, end: stringOrDate, allDay: boolean }) => void;
//     onEventResize?: (args: { event: TEvent, start: stringOrDate, end: stringOrDate, allDay: boolean }) => void;
//     onDragStart?: (args: { event: TEvent, action: 'resize' | 'move', direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' }) => void;
//     onDragOver?: (event: React.DragEvent) => void;
//     onDropFromOutside?: (args: { start: stringOrDate, end: stringOrDate, allDay: boolean }) => void;
//     dragFromOutsideItem?: () => keyof TEvent | ((event: TEvent) => Date);
//     draggableAccessor?: keyof TEvent | ((event: TEvent) => boolean);
//     resizableAccessor?: keyof TEvent | ((event: TEvent) => boolean);
//     selectable?: true | false | 'ignoreEvents';
//     resizable?: boolean;
//     components?: Components<TEvent>;
//     elementProps?: React.HTMLAttributes<HTMLElement>;
//     step?: number;
// }


export default () => (
    <ErrorBoundary>
        <Calendar />
    </ErrorBoundary>
);
