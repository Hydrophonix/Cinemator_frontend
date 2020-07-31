// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

type PropTypes = {
    index?: number
    setIndex?: (index: number) => void
    title?: string
    setTitle?: (newTitle: string) => void
    lightVersion?: true
    reqType?: string
    setReqType?: (newReqType: string) => void
}

type Params = { projectId: string };

export const RequisitesHead: FC<PropTypes> = ({
    lightVersion,
    index, setIndex,
    title, setTitle,
    reqType, setReqType,
}) => {
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

    const onTitleChange = (event: any) => setTitle && void setTitle(event.target.value);
    const onTypeChange = (event: any) => setReqType && void setReqType(event.target.value);

    const resetIndex = () => setIndex && (index !== 0) && void setIndex(0);
    const resetTitle = () => setTitle && void setTitle('');
    const resetType = () => setReqType && void setReqType('');

    return (
        <Thead>
            <Tr className = 'requisitesTableHead'>
                <Th style = {{ width: 35 }}>
                    {
                        typeof index === 'number'
                            ? (
                                <nav style = {{ width: 40 }}>
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
                                                    color = { theme.requisite.hoverSecondary }
                                                    icon = 'times-circle'
                                                    style = {{ zIndex: 1 }}
                                                />
                                            </span>
                                        )
                                    }
                                </nav>
                            )
                            : <nav style = {{ width: 40, textAlign: 'center' }}>#</nav>
                    }
                </Th>
                {
                    !lightVersion && (
                        <Th>
                            {
                                typeof reqType === 'string'
                                    ? (
                                        <nav style = {{ width: 100 }}>
                                            <input
                                                placeholder = 'All types'
                                                style = {{ width: 100 }}
                                                value = { reqType }
                                                onChange = { onTypeChange }
                                            />
                                            <span
                                                onClick = {
                                                    () => reqType !== ''
                                                        ? void resetType()
                                                        : void push(`/${projectId}/requisites/types`)
                                                }>
                                                <FontAwesomeIcon
                                                    color = { theme.requisite.hoverSecondary }
                                                    icon = { reqType !== '' ? 'times-circle' : 'compass' }
                                                    style = {{ zIndex: 1 }}
                                                />
                                            </span>
                                        </nav>
                                    )
                                    : 'Type'
                            }
                        </Th>
                    )
                }
                <Th>
                    {
                        typeof title === 'string'
                            ? (
                                <nav style = {{ width: 100 }}>
                                    <input
                                        placeholder = 'Title search'
                                        style = {{ width: 100 }}
                                        value = { title }
                                        onChange = { onTitleChange }
                                    />
                                    {
                                        title !== '' && (
                                            <span onClick = { resetTitle }>
                                                <FontAwesomeIcon
                                                    color = { theme.requisite.hoverSecondary }
                                                    icon = 'times-circle'
                                                    style = {{ zIndex: 1 }}
                                                />
                                            </span>
                                        )
                                    }
                                </nav>
                            )
                            : 'Title'
                    }
                </Th>
                { !lightVersion && <Th>Scenes</Th> }
            </Tr>
        </Thead>
    );
};
