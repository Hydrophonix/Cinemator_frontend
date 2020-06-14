// Core
import React, { FC } from 'react';

// Types
type PropTypes = {
    id: string
    sceneName: string
    location: string
    workdayIds: Array<string>
    scenarioDay: number // TODO ?
    requisiteIds: Array<string>
    sceneRedirectHandler: (sceneId: string) => void
};

// Styles
import { SceneItemContainer, Cell } from './styles';

export const SceneItem: FC<PropTypes> = ({
    id,
    sceneName,
    location,
    // workdayIds,
    // scenarioDay, // TODO ?
    requisiteIds,
    sceneRedirectHandler,
}) => {
    return (
        <SceneItemContainer onClick = { () => sceneRedirectHandler(id) }>
            <section>
                <Cell>{id}</Cell>
                <Cell>{sceneName}</Cell>
                <Cell>{location}</Cell>
                <Cell>01/01/1010</Cell>
                <Cell>Requisite: {requisiteIds.length}</Cell>
            </section>
        </SceneItemContainer>
    );
};
