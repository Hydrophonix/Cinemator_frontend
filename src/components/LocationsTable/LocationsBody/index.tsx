// Core
import React, { FC } from 'react';
import { Tbody, Tr, Td } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button } from '../../../elements';

// Types
import { Locations_locations } from '../../../bus/Location';

type Proptypes = {
    locations: Locations_locations[]
    deleteLocationHandler: (locationId: string) => void
    locationIdsArray?: String[]
    setLocationIdsArray?: (locationId: string) => void
}

export const LocationsBody: FC<Proptypes> = ({
    locations, deleteLocationHandler, locationIdsArray, setLocationIdsArray,
}) => {
    return (
        <Tbody>
            {
                locations.map((location) => (
                    <Tr
                        className = 'locationsTableRow'
                        key = { location.id }
                        style = {
                            locationIdsArray?.includes(location.id)
                                ? { backgroundColor: 'green' } : {}
                        }
                        onClick = { () => {
                            setLocationIdsArray && void setLocationIdsArray(location.id);
                        } }>
                        <Td style = {{ textAlign: 'center' }}>
                            {location.name}
                        </Td>
                        <Td style = {{ display: 'flex', justifyContent: 'center' }}>
                            <Button>
                                <FontAwesomeIcon
                                    color = '#000'
                                    icon = 'wrench'
                                    style = {{ width: 16, height: 16 }}
                                />
                            </Button>
                            <Button onClick = { () => deleteLocationHandler(location.id) }>
                                <FontAwesomeIcon
                                    color = '#000'
                                    icon = 'trash-alt'
                                    style = {{ width: 16, height: 16 }}
                                />
                            </Button>
                        </Td>
                    </Tr>
                ))
            }
        </Tbody>
    );
};
