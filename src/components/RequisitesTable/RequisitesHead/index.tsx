// Core
import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

// Elements
import { TableInputWithIcon } from '../../../elements';

// Styles
import { Thead } from '../styles';

// Types
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
            <tr>
                <th>
                    {
                        typeof index === 'number'
                            ? (
                                <TableInputWithIcon
                                    color = { theme.requisite.hoverSecondary }
                                    icon = 'times-circle'
                                    isIconVisible = { index !== 0 }
                                    style = {{ textAlign: 'center' }}
                                    type = 'number'
                                    value = { index }
                                    width = { 40 }
                                    onChange = { onIndexChange }
                                    onClick = { resetIndex }
                                />
                            )
                            : <nav style = {{ width: 40, textAlign: 'center' }}>#</nav>
                    }
                </th>
                {
                    !lightVersion && (
                        <th>
                            {
                                typeof reqType === 'string'
                                    ? (
                                        <TableInputWithIcon
                                            isIconVisible
                                            color = { theme.requisite.hoverSecondary }
                                            icon = { reqType !== '' ? 'times-circle' : 'compass' }
                                            placeholder = 'All types'
                                            value = { reqType }
                                            width = { 100 }
                                            onChange = { onTypeChange }
                                            onClick = {
                                                () => reqType !== ''
                                                    ? void resetType()
                                                    : void push(`/${projectId}/requisites/types`)
                                            }
                                        />
                                    )
                                    : 'Type'
                            }
                        </th>
                    )
                }
                <th>
                    {
                        typeof title === 'string'
                            ? (
                                <TableInputWithIcon
                                    color = { theme.requisite.hoverSecondary }
                                    icon = 'times-circle'
                                    isIconVisible = { title !== '' }
                                    placeholder = 'Title search'
                                    value = { title }
                                    width = { 100 }
                                    onChange = { onTitleChange }
                                    onClick = { resetTitle }
                                />
                            )
                            : 'Title'
                    }
                </th>
                { !lightVersion && <th>Scenes</th> }
            </tr>
        </Thead>
    );
};
