// Core
import React, { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

// Styles
import { Thead, NavCell } from '../styles';

// Types
type PropTypes = {
    index?: number
    setIndex?: (index: number) => void
    location?: string
    setLocation?: (location: string) => void
    lightVersion?: true
}

type Params = { projectId: string };

export const ScenesHead: FC<PropTypes> = ({ index, setIndex, location, setLocation, lightVersion }) => {
    const theme = useContext(ThemeContext);
    const { push } = useHistory();
    const { projectId } = useParams<Params>();

    const onIndexChange = (event: any) => {
        const value: string = event.target.value !== '' ? event.target.value : '0';
        const number = parseInt(value, 10);
        const newIndex = number >= 0 && number <= 999 ? number : 0;
        const isIndexDiff = newIndex !== index;

        setIndex && isIndexDiff && void setIndex(newIndex);
    };

    const resetIndex = () => setIndex && void setIndex(0);

    const onLocationChange = (event: any) => setLocation && void setLocation(event.target.value);

    const resetLocation = () => setLocation && void setLocation('');

    return (
        <Thead>
            <tr>
                <th>
                    {
                        typeof index === 'number'
                            ? (
                                <NavCell style = {{ width: 40 }}>
                                    <input
                                        style = {{ width: 40, textAlign: 'center' }}
                                        type = 'number'
                                        value = { index }
                                        onChange = { onIndexChange }
                                    />
                                    {
                                        index !== 0 && (
                                            <span onClick = { resetIndex }>
                                                <FontAwesomeIcon
                                                    color = { theme.scene.hoverSecondary }
                                                    icon = 'times-circle'
                                                />
                                            </span>
                                        )
                                    }
                                </NavCell>
                            )
                            : (
                                <nav style = {{ width: 40, textAlign: 'center' }}>
                                    #
                                </nav>
                            )
                    }
                </th>
                <th>
                    {
                        typeof location === 'string'
                            ? (
                                <NavCell style = {{ width: 100 }}>
                                    <input
                                        placeholder = 'All locations'
                                        style = {{ width: 100 }}
                                        value = { location }
                                        onChange = { onLocationChange }
                                    />
                                    <span onClick = {
                                        () => location !== ''
                                            ? void resetLocation()
                                            : void push(`/${projectId}/scenes/locations`)
                                    }>
                                        <FontAwesomeIcon
                                            color = { theme.scene.hoverSecondary }
                                            icon = { location !== '' ? 'times-circle' : 'compass' }
                                        />
                                    </span>
                                </NavCell>
                            )
                            : 'Locations'
                    }
                </th>
                {
                    !lightVersion && (
                        <>
                            <th>Workdays</th>
                            <th>Requisites</th>
                        </>
                    )
                }
            </tr>
        </Thead>
    );
};
