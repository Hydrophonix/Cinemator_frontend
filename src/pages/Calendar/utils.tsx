// Core
import React from 'react';

// Types
import { EventTypes } from './types';
import { Workdays } from '../../bus/Workday';

type TransformedWorkDayTypes = {
    workdaysDates: string[]
    events: EventTypes[]
}

export const customEventView = ({ event }: { event: EventTypes }) => {
    return (
        <span>
            <strong>{ event.id } сцена </strong>
            {/* { event.desc && ':  ' + event.desc } */}
        </span>
    );
};

export const workdaysDataTransformer = (data: Workdays): TransformedWorkDayTypes => {
    return data.workdays.reduce((acc, workday) => {
        const workdayEvents: EventTypes[] = workday.scenes.map((scene) => ({
            id:          scene.id,
            start:       new Date(workday.date),
            end:         new Date(workday.date),
            title:       scene.title,
            location:    scene.location,
            sceneNumber: scene.sceneNumber,
        }));

        return {
            workdaysDates: [ ...acc.workdaysDates, workday.date ],
            events:        [ ...acc.events, ...workdayEvents ],
        };
    }, { workdaysDates: [], events: []} as TransformedWorkDayTypes);
};
