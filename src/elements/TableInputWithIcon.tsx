// Core
import React, { FC } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon, FontAwesomeIconProps  } from '@fortawesome/react-fontawesome';

// Elements
import { Input, InputProps } from '.';

// Constants
const BUTTON_SIZE = 18;

// Styles
const Container = styled.nav<{color?: string}>`
    position: relative;

    input {
        padding: 1px 2px;
        border-radius: 4px;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: ${BUTTON_SIZE}px;
        height: ${BUTTON_SIZE}px;
        background-color: #fff;
        top: -5px;
        right: -10px;
        border-radius: 100%;
        z-index: 1;

        svg {
            cursor: pointer;
            width: ${BUTTON_SIZE}px;
            height: ${BUTTON_SIZE}px;
        }
        
        &:hover {
            background-color: ${({ color }) => color || '#000'};
            svg > path {
                fill: #fff;
            }
        }
    }
`;

type PropTypes = {
    width?: number;
    isIconVisible: boolean
} & InputProps & FontAwesomeIconProps;

export const TableInputWithIcon: FC<PropTypes> = ({ width, icon, color, isIconVisible, onClick, ...inputProps }) => {
    return (
        <Container
            color = { color }
            style = { width ? { width } : {} }>
            <Input { ...inputProps } />
            {
                isIconVisible && (
                    <div>
                        <FontAwesomeIcon
                            color = { color }
                            icon = { icon }
                            onClick = { onClick }
                        />
                    </div>
                )
            }
        </Container>
    );
};
