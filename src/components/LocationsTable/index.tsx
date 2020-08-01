// Core
import React, { FC } from 'react';

// Components
import { LocationsHead } from './LocationsHead';
import { LocationsBody } from './LocationsBody';

// Styles
import { Table } from './styles';

// Types
import { Locations_locations } from '../../bus/Location';

type PropTypes = {
    locations: Locations_locations[]
    updateLocationHandler: (locationId: string, name: string) => Promise<boolean>
    deleteLocationHandler: (locationId: string) => void
    locationIds?: String[]
    handler?: (locationId: string) => void
}

export const LocationsTable: FC<PropTypes> = ({
    locations,
    updateLocationHandler,
    deleteLocationHandler,
    locationIds,
    handler,
}) => {
    return (
        <Table>
            <LocationsHead />
            <LocationsBody
                deleteLocationHandler = { deleteLocationHandler }
                handler = { handler }
                locationIds = { locationIds }
                locations = { locations }
                updateLocationHandler = { updateLocationHandler }
            />
        </Table>
    );
};
