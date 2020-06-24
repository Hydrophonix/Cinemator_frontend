// Core
import React from 'react';

// Types
import { EventTypes } from './types';

export const customEventView = ({ event }: { event: EventTypes }) => {
    return (
        <span>
            <strong>{ event.id } сцена </strong>
            { event.desc && ':  ' + event.desc }
        </span>
    );
};

export const customDayPropGetter = (date: Date) => {
    if (date.getDate() === 7 || date.getDate() === 15) {
        return {
            className: 'special-day',
            style:     {
                border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
            },
        };
    }

    return {};
};
