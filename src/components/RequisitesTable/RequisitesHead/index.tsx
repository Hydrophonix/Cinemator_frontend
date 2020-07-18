// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

type PropTypes = {
    index?: number
    setIndex?: (index: number) => void
    title?: string
    setTitle?: (newTitle: string) => void
    lightVersion?: Object
}

export const RequisitesHead: FC<PropTypes> = ({
    lightVersion,
    index, setIndex,
    title, setTitle,
}) => {
    const theme = useContext(ThemeContext);

    const onIndexChange = (event: any) => {
        const value: string = event.target.value !== '' ? event.target.value : '0';
        const number = parseInt(value, 10);
        const newIndex = number >= 0 && number <= 999 ? number : 0;
        const isIndexDiff = newIndex !== index;

        setIndex && isIndexDiff && void setIndex(newIndex);
    };

    const onTitleChange = (event: any) => setTitle && void setTitle(event.target.value);

    const resetIndex = () => setIndex && (index !== 0) && void setIndex(0);

    const resetTitle = () => setTitle && void setTitle('');

    return (
        <Thead>
            <Tr className = 'requisitesTableHead'>
                <Th style = {{ width: 35 }}>
                    {
                        typeof index === 'number'
                            ? (
                                <nav style = {{ width: 35 }}>
                                    <input
                                        style = {{ width: 35, textAlign: 'center' }}
                                        type = 'number'
                                        value = { index }
                                        onChange = { onIndexChange }
                                    />
                                    {
                                        index !== 0 && (
                                            <span onClick = { resetIndex }>
                                                <FontAwesomeIcon
                                                    color = { theme.requisite.hoverSecondary }
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
                <Th>
                    {
                        typeof title === 'string'
                            ? (
                                <nav style = {{ width: 150 }}>
                                    <input
                                        placeholder = 'Title search'
                                        style = {{ width: 150 }}
                                        value = { title }
                                        onChange = { onTitleChange }
                                    />
                                    {
                                        title !== '' && (
                                            <span onClick = { resetTitle }>
                                                <FontAwesomeIcon
                                                    color = { theme.requisite.hoverSecondary }
                                                    icon = 'times-circle'
                                                />
                                            </span>
                                        )
                                    }
                                </nav>
                            )
                            : <nav style = {{ width: 150, textAlign: 'left' }}>Title</nav>
                    }
                </Th>
                {
                    !lightVersion && (
                        <Th>Scenes</Th>
                    )
                }
            </Tr>
        </Thead>
    );
};
