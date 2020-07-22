// Core
import React, { FC } from 'react';
import { Table } from 'react-super-responsive-table';

// Components
import { LocationsHead } from './LocationsHead';
import { LocationsBody } from './LocationsBody';

// Styles
import { TableStyles } from '../../assets';
import { Locations_locations } from '../../bus/Location';

type PropTypes = {
    locations: Locations_locations[]
    updateLocationHandler: (locationId: string, name: string) => Promise<boolean>
    deleteLocationHandler: (locationId: string) => void
    locationIdsArray?: String[]
    handler?: (locationId: string) => void
}

export const LocationsTable: FC<PropTypes> = ({
    locations,
    updateLocationHandler,
    deleteLocationHandler,
    locationIdsArray,
    handler,
}) => {
    return (
        <TableStyles>
            <Table>
                <LocationsHead />
                <LocationsBody
                    deleteLocationHandler = { deleteLocationHandler }
                    handler = { handler }
                    locationIdsArray = { locationIdsArray }
                    locations = { locations }
                    updateLocationHandler = { updateLocationHandler }
                />
            </Table>
        </TableStyles>
    );
};
