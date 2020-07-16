// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Types
import { IndexPayload } from '../../../@init/redux/inputs/types';

type PropTypes = {
    index?: number
    setItemIndex?: (payload: IndexPayload) => void,
}

export const ScenesHead: FC<PropTypes> = ({ index, setItemIndex }) => {
    const theme = useContext(ThemeContext);

    const onChange = (event: any) => {
        if (setItemIndex) {
            const value = event.target.value !== '' ? event.target.value : 0;
            const number = parseInt(value, 10);
            const newIndex = number >= 0 && number <= 999 ? number : 0;

            newIndex !== index && void setItemIndex({ inputType: 'scenesInputs', index: newIndex });
        }
    };

    const resetIndex = () => {
        if (setItemIndex) {
            index !== 0 && void setItemIndex({ inputType: 'scenesInputs', index: 0 });
        }
    };

    return (
        <Thead>
            <Tr className = 'scenesTableHead'>
                <Th>
                    <nav>
                        <input
                            type = 'number'
                            value = { index }
                            onChange = { onChange }
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
                    </nav>
                </Th>
                <Th>Location</Th>
                <Th>Workdays</Th>
                <Th>Requisites</Th>
            </Tr>
        </Thead>
    );
};
