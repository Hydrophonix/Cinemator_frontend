// Core
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _difference from 'lodash/difference';

// Elements
import { Button } from '../../../elements';

// Styles
import { CustomToolbarContainer, ScenesCount, RequisitesCount } from './styles';

// Types
import { EventTypes } from '../types';
import { Workdays } from '../../../bus/Workday';

export const workdaysDataTransformer = ({ workdays }: Workdays): Array<EventTypes> => {
    return workdays.map((workday) => {
        const eventDate = new Date(workday.date);

        const requisitesCount = workday.scenes.reduce<Array<string>>((acc, scene) => {
            const requisiteIds = scene.requisites.map((requisite) => requisite.id);
            const difference = _difference(requisiteIds, acc);

            return [ ...acc, ...difference ];
        }, []).length;

        const sceneNumbers = workday.scenes.reduce<string>((acc, scene, index) => {
            if (index === 0) {
                return `${scene.number}`;
            }

            return `${acc}, ${scene.number}`;
        }, '');

        return {
            workdayId: workday.id,
            start:     eventDate,
            end:       eventDate,
            sceneNumbers,
            requisitesCount,
        };
    });
};

export const customEventView = ({ event: { sceneNumbers, requisitesCount }}: { event: EventTypes }) => {
    return (
        <section>
            {
                sceneNumbers.length !== 0 && (
                    <>
                        <ScenesCount>{`S: ${sceneNumbers}`}</ScenesCount>
                        <RequisitesCount>{`R: ${requisitesCount}`}</RequisitesCount>
                    </>
                )
            }
        </section>
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
            <Button
                title = 'Prev month'
                onClick = { goToBack }>
                <FontAwesomeIcon
                    color = '#000'
                    icon = 'reply'
                    style = {{ width: 16, height: 16 }}
                />
            </Button>
            {toolbar.label}
            <Button
                title = 'Next month'
                onClick = { goToNext }>
                <FontAwesomeIcon
                    color = '#000'
                    icon = 'share'
                    style = {{ width: 16, height: 16 }}
                />
            </Button>
        </CustomToolbarContainer>
    );
};
