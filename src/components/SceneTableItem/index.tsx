// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

// Type
import { Scenes_scenes } from '../../bus/Scene';

// Types
type PropTypes = Omit<Scenes_scenes, 'projectId'> & {
    sceneRedirectHandler: (sceneId: string) => void
}

export const SceneTableItem: FC<any> = ({
    id,
    title,
    location,
    sceneNumber,
    sceneRedirectHandler,
}) => {
    return (
        <Tr onClick = { () => sceneRedirectHandler(id) }>
            <Td>{`${sceneNumber}`}</Td>
            <Td>{title}</Td>
            <Td>{location}</Td>
            <Td>01/01/1010</Td>
            <Td>Items: {5}</Td>
        </Tr>
    );
};
