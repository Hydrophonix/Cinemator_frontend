// Core
import React, { FC } from 'react';
import styled from 'styled-components';

interface ToggleButtonProps {
    active: boolean;
}

interface ToggleProps extends ToggleButtonProps {
    onChange: (value: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ active, onChange }) => {
    return (
        <ToggleContainer onClick = { () => onChange(!active) }>
            <ToggleBar>
                < ToggleButton active = { active }/>
            </ToggleBar>
        </ToggleContainer>
    );
};

// Styles
const ToggleContainer = styled.div`
    background: none;
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToggleBar = styled.div`
    width: 30px;
    height: 14px;
    border-radius: 8px;
    background-color: ${({ theme: { primaryVariant }}) => primaryVariant}; 
`;

const ToggleButton = styled.div<ToggleButtonProps>`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${({ theme: { error }}) => error};
    border-radius: 10px;
    top: 0;
    left: 0;
    z-index: 2147000000;
    ${({ active }) => active ? '' : 'transform: translateX(20px);'};
    transition: .2s;
`;

