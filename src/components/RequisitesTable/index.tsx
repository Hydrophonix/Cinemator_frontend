// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { RequisitesHead } from './RequisitesHead';
import { RequisitesBody } from './RequisitesBody';

// Styles
import { TableStyles } from '../../assets';

// Types
import { Requisites_requisites } from '../../bus/Requisite';

type PropTypes = {
    requisites: Requisites_requisites[]
    sceneId?: string
    index?: number
    setIndex?: (newIndex: number) => void
    title?: string
    setTitle?: (newTitle: string) => void
    lightVersion?: {
        requisitesIdsArray: Array<string>
        setRequisitesIdsArray: (sceneId: string) => void
    }
}

export const RequisitesTable: FC<PropTypes> = ({
    requisites, sceneId, lightVersion,
    index, setIndex,
    title, setTitle,
}) => {
    return (
        <TableStyles>
            <Table>
                <RequisitesHead
                    index = { index }
                    lightVersion = { lightVersion }
                    setIndex = { setIndex }
                    setTitle = { setTitle }
                    title = { title }
                />
                <RequisitesBody
                    lightVersion = { lightVersion }
                    requisites = { requisites }
                    sceneId = { sceneId }
                />
            </Table>
        </TableStyles>
    );
};
