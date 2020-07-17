// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { RequisitesHead } from './RequisitesHead';
import { RequisitesBody } from './RequisitesBody';

// Styles
import { TableStyles } from '../../assets';
import { Requisites_requisites } from '../../bus/Requisite';

// Types
type PropTypes = {
    requisites: Requisites_requisites[]
    sceneId?: string
}

export const RequisitesTable: FC<PropTypes> = ({ requisites, sceneId }) => {
    return (
        <div style = {{
            overflowX: 'hidden',
            overflowY: 'scroll',
        }}>
            <TableStyles>
                <Table>
                    <RequisitesHead />
                    <RequisitesBody
                        requisites = { requisites }
                        sceneId = { sceneId }
                    />
                </Table>
            </TableStyles>
        </div>
    );
};
