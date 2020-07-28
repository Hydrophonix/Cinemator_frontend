// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { ReqTypesHead } from './ReqTypesHead';
import { ReqTypesBody } from './ReqTypesBody';

// Styles
import { TableStyles } from '../../assets';
import { ReqTypes_reqTypes } from '../../bus/ReqType';

type PropTypes = {
    reqTypes: ReqTypes_reqTypes[]
    updateReqTypeHandler: (reqType: string, name: string) => Promise<boolean>
    deleteReqTypeHandler: (reqType: string) => void
    reqTypeIds?: String[]
    handler?: (reqType: string) => void
}

export const ReqTypesTable: FC<PropTypes> = ({
    reqTypes,
    updateReqTypeHandler,
    deleteReqTypeHandler,
    reqTypeIds,
    handler,
}) => {
    return (
        <TableStyles>
            <Table>
                <ReqTypesHead />
                <ReqTypesBody
                    deleteReqTypeHandler = { deleteReqTypeHandler }
                    handler = { handler }
                    reqTypeIds = { reqTypeIds }
                    reqTypes = { reqTypes }
                    updateReqTypeHandler = { updateReqTypeHandler }
                />
            </Table>
        </TableStyles>
    );
};
