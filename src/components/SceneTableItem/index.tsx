// Core
import React, { FC } from 'react';
import { Tr, Td } from 'react-super-responsive-table';

// Type
import { Scenes_scenes } from '../../bus/Scene';

// Types
type PropTypes = Omit<Scenes_scenes, 'projectId'> & {
    handler?: Function
    isActive?: boolean
}

export const SceneTableItem: FC<any> = ({
    title,
    location,
    sceneNumber,
    handler,
    isActive,
}) => {
    return (
        <Tr
            style = { isActive ? { backgroundColor: 'lightgreen' } : {} }
            onClick = { handler ? handler : () => void 0 }>
            <Td>{`${sceneNumber}`}</Td>
            <Td>{title}</Td>
            <Td>{location}</Td>
            <Td>01/01/1010</Td>
            <Td>Items: {5}</Td>
        </Tr>
    );
};
