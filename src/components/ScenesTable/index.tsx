// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { ScenesHead } from './ScenesHead';
import { ScenesBody } from './ScenesBody';

// Styles
import { TableStyles } from '../../assets';
import { Scenes_scenes } from '../../bus/Scene';

type PropTypes = {
    scenes: Scenes_scenes[]
    workdayId?: string
    index?: number
    setIndex?: (index: number) => void
    location?: string
    setLocation?: (location: string) => void
    lightVersion?: {
        scenesIdsArray: Array<string>
        setScenesIdsArray: (sceneId: string) => void
    }
}

export const ScenesTable: FC<PropTypes> = ({
    scenes, workdayId, index, setIndex, location, setLocation, lightVersion,
}) => {
    return (
        <TableStyles>
            <Table>
                <ScenesHead
                    index = { index }
                    lightVersion = { lightVersion }
                    location = { location }
                    setIndex = { setIndex }
                    setLocation = { setLocation }
                />
                <ScenesBody
                    lightVersion = { lightVersion }
                    scenes = { scenes }
                    workdayId = { workdayId }
                />
            </Table>
        </TableStyles>
    );
};
