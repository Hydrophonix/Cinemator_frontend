// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { ScenesHead } from './ScenesHead';
import { ScenesBody } from './ScenesBody';

// Styles
import { TableStyles } from '../../assets';
import { Scenes_scenes } from '../../bus/Scene';

// Types
import { IndexPayload } from '../../@init/redux/inputs/types';

type PropTypes = {
    scenes: Scenes_scenes[]
    workdayId?: string
    index?: number
    setItemIndex?: (payload: IndexPayload) => void,
}

export const ScenesTable: FC<PropTypes> = ({
    scenes, workdayId, index, setItemIndex,
}) => {
    return (
        <TableStyles>
            <Table>
                <ScenesHead
                    index = { index }
                    setItemIndex = { setItemIndex }
                />
                <ScenesBody
                    scenes = { scenes }
                    workdayId = { workdayId }
                />
            </Table>
        </TableStyles>
    );
};
