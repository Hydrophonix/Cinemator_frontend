// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

type PropTypes = {
    index?: number
    setIndex?: (index: number) => void
    lightVersion?: Object
}

export const ScenesHead: FC<PropTypes> = ({ index, setIndex, lightVersion }) => {
    const theme = useContext(ThemeContext);

    const onChange = (event: any) => {
        const value: string = event.target.value !== '' ? event.target.value : '0';
        const number = parseInt(value, 10);
        const newIndex = number >= 0 && number <= 999 ? number : 0;
        const isIndexDiff = newIndex !== index;

        setIndex && isIndexDiff && void setIndex(newIndex);
    };

    const resetIndex = () => setIndex && (index !== 0) && void setIndex(0);

    return (
        <Thead>
            <Tr className = 'scenesTableHead'>
                <Th>
                    {
                        typeof index === 'number'
                            ? (
                                <nav style = {{ width: 35 }}>
                                    <input
                                        style = {{ width: 35, textAlign: 'center' }}
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
                            )
                            : <nav style = {{ width: 35, textAlign: 'center' }}>#</nav>
                    }

                </Th>
                <Th>Location</Th>
                {
                    !lightVersion && (
                        <>
                            <Th>Workdays</Th>
                            <Th>Requisites</Th>
                        </>
                    )
                }
            </Tr>
        </Thead>
    );
};
