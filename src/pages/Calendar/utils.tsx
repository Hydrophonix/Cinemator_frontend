// Core
import React from 'react';

// Elements
import { Button } from '../../elements';

// Styles
import { CustomToolbarContainer } from './styles';

// Types
import { EventTypes } from './types';
import { Workdays } from '../../bus/Workday';

export const workdaysDataTransformer = ({ workdays }: Workdays): Array<EventTypes> => {
    return workdays.reduce<Array<EventTypes>>((acc, workday) => [
        ...acc, ...workday.scenes.map((scene) => ({
            id:          scene.id,
            start:       new Date(workday.date),
            end:         new Date(workday.date),
            sceneNumber: scene.sceneNumber,
        })),
    ], []);
};

export const customEventView = ({ event }: { event: EventTypes }) => {
    return (
        <div style = {{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            S:{event.sceneNumber}
        </div>
    );
};

export const customToolbarView = (toolbar: any) => {
    const goToBack = () => {
        let mDate = toolbar.date;
        let newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
        toolbar.onNavigate('prev', newDate);
    };

    const goToNext = () => {
        let mDate = toolbar.date;
        let newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
        toolbar.onNavigate('next', newDate);
    };

    return (
        <CustomToolbarContainer>
            <Button onClick = { goToBack }>prev</Button>
            {toolbar.label}
            <Button onClick = { goToNext }>next</Button>
        </CustomToolbarContainer>
    );
};
