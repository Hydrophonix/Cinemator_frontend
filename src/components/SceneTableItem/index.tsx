// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

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

export const SceneTableItem: FC<PropTypes> = ({
    id,
    sceneName,
    location,
    // workdayIds,
    // scenarioDay, // TODO ?
    requisiteIds,
    sceneRedirectHandler,
}) => {
    return (
        <Tr onClick = { () => sceneRedirectHandler(id) }>
            <Td>{id}</Td>
            <Td>{sceneName}</Td>
            <Td>{location}</Td>
            <Td>01/01/1010</Td>
            <Td>Items: {requisiteIds.length}</Td>
        </Tr>
    );
};
