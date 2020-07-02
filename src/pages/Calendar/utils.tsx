// Core
import React from 'react';

// Types
import { EventTypes } from './types';
import { Workdays } from '../../bus/Workday';

export const customEventView = ({ event }: { event: EventTypes }) => {
    return (
        <div style = {{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <strong>{event.sceneNumber}</strong>
            {/* { event.desc && ':  ' + event.desc } */}
        </div>
    );
};

export const workdaysDataTransformer = ({ workdays }: Workdays): Array<EventTypes> => {
    return workdays.reduce<Array<EventTypes>>((acc, workday) => [
        ...acc, ...workday.scenes.map((scene) => ({
            id:          scene.id,
            start:       new Date(workday.date),
            end:         new Date(workday.date),
            title:       scene.title,
            location:    scene.location,
            sceneNumber: scene.sceneNumber,
        })),
    ], []);
};
