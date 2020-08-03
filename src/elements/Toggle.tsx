// Core
import React, { FC } from 'react';
import styled from 'styled-components';

// Types
interface ToggleButtonProps {
    active: boolean;
}

interface ToggleProps extends ToggleButtonProps {
    onChange: (value: boolean) => void;
    text?: string;
}

// Styles
const ToggleContainer = styled.div`
    background: none;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToggleBar = styled.div`
    width: 100%;
    height: 32px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
`;

const ToggleButton = styled.div<ToggleButtonProps>`
    position: absolute;
    width: 50%;
    height: 22px;
    background-color: ${({ theme, active }) => active ? theme.workday.secondary : theme.scene.secondary};
    border-radius: 4px;
    top: 5px;
    left: 5px;
    z-index: 2147000000;
    ${({ active }) => active ? 'transform: translateX(95%);' : ''};
    transition: .2s;

    color: #fff;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

export const Toggle: FC<ToggleProps> = ({ active, onChange, text }) => {
    return (
        <ToggleContainer onClick = { () => void onChange(!active) }>
            <ToggleBar>
                <ToggleButton active = { active }>
                    {text}
                </ToggleButton>
            </ToggleBar>
        </ToggleContainer>
    );
};
