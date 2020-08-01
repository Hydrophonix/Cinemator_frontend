// Core
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button, Input } from '../../../elements';

// Styles
import { Tbody } from '../styles';
import { UpdateLocationContainer } from './styles';

// Types
import { Locations_locations } from '../../../bus/Location';


type Proptypes = {
    locations: Locations_locations[]
    updateLocationHandler: (locationId: string, name: string) => Promise<boolean>
    deleteLocationHandler: (locationId: string) => void
    locationIds?: String[]
    handler?: (locationId: string) => void
}

export const LocationsBody: FC<Proptypes> = ({
    locations, updateLocationHandler, deleteLocationHandler, locationIds, handler,
}) => {
    const [ updateLocationId, setUpdateLocationId ] = useState('');
    const [ tempLocationName, setTempLocationName ] = useState('');

    return (
        <Tbody>
            {
                locations.map((location) => (
                    <tr
                        key = { location.id }
                        style = { locationIds?.includes(location.id) ? { backgroundColor: 'green' } : {} }
                        onClick = { () => handler && void handler(location.id) }>
                        <td style = {{ textAlign: 'center', maxWidth: 200, width: '100%' }}>
                            {
                                updateLocationId !== location.id
                                    ? location.name
                                    : (
                                        <UpdateLocationContainer>
                                            <Input
                                                placeholder = 'Location name'
                                                value = { tempLocationName }
                                                onChange = { (event) => void setTempLocationName(event.target.value) }
                                                onClick = { (event) => void event.stopPropagation() }
                                            />
                                        </UpdateLocationContainer>
                                    )
                            }
                        </td>
                        <td style = {{ display: 'flex', justifyContent: 'center' }}>
                            {
                                updateLocationId !== location.id
                                    ? (
                                        <>
                                            <Button
                                                title = 'Settings'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    setUpdateLocationId(location.id);
                                                    setTempLocationName(location.name);
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'wrench'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                            <Button
                                                title = 'Delete'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    deleteLocationHandler(location.id);
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'trash-alt'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                        </>
                                    )
                                    : (
                                        <>
                                            <Button
                                                title = 'Save'
                                                onClick = { async (event) => {
                                                    event.stopPropagation();
                                                    const isUpdated = await updateLocationHandler(
                                                        location.id, tempLocationName,
                                                    );

                                                    if (isUpdated) {
                                                        setUpdateLocationId('');
                                                        setTempLocationName('');
                                                    }
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'save'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                            <Button
                                                title = 'Cancel'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    setUpdateLocationId('');
                                                    setTempLocationName('');
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'times'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                        </>
                                    )
                            }
                        </td>
                    </tr>
                ))
            }
        </Tbody>
    );
};
