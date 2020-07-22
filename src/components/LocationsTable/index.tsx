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
    deleteLocationHandler: (locationId: string) => void
    locationIdsArray?: String[]
    setLocationIdsArray?: (locationId: string) => void
}

export const LocationsTable: FC<PropTypes> = ({
    locations,
    deleteLocationHandler,
    locationIdsArray,
    setLocationIdsArray,
}) => {
    return (
        <TableStyles>
            <Table>
                <LocationsHead />
                <LocationsBody
                    deleteLocationHandler = { deleteLocationHandler }
                    locationIdsArray = { locationIdsArray }
                    locations = { locations }
                    setLocationIdsArray = { setLocationIdsArray }
                />
            </Table>
        </TableStyles>
    );
};
