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
    reqType?: string
    setReqType?: (newReqType: string) => void
    lightVersion?: true
    requisiteIds?: Array<string>
    handler?: (requisiteId: string) => void
}

export const RequisitesTable: FC<PropTypes> = ({
    requisites, sceneId, lightVersion,
    index, setIndex,
    title, setTitle,
    reqType, setReqType,
    requisiteIds, handler,
}) => {
    return (
        <TableStyles>
            <Table>
                <RequisitesHead
                    index = { index }
                    lightVersion = { lightVersion }
                    reqType = { reqType }
                    setIndex = { setIndex }
                    setReqType = { setReqType }
                    setTitle = { setTitle }
                    title = { title }
                />
                <RequisitesBody
                    handler = { handler }
                    lightVersion = { lightVersion }
                    requisiteIds = { requisiteIds }
                    requisites = { requisites }
                    sceneId = { sceneId }
                />
            </Table>
        </TableStyles>
    );
};
