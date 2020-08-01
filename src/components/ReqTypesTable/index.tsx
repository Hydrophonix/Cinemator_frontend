// Core
import React, { FC } from 'react';

// Components
import { ReqTypesHead } from './ReqTypesHead';
import { ReqTypesBody } from './ReqTypesBody';

// Styles
import { Table } from './styles';

// Types
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
    );
};
