// Core
import React, { FC, DetailedHTMLProps, Ref } from 'react';
import styled from 'styled-components';

interface ButtonProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    // use React.Ref instead of React.LegacyRef to prevent type incompatibility errors with styled-components types
    ref?: Ref<HTMLButtonElement>;
    active?: boolean;
}

// Styles
const Styled = styled.button<ButtonProps>`
    cursor: pointer;
    outline: none;
    border-width: 2px;
    border-radius: 8px;
    background-color: ${({ theme, active }) => active && theme.button.primary};
    border-color: ${({ theme, active }) => active && theme.button.secondary};
    border-style: ${({ active }) => active && 'inset'};
    font-family: sans-serif;

    &:hover, &:focus {
        background-color: ${({ theme }) => theme.button.primary};
        border-color: ${({ theme }) => theme.button.secondary};
    }
`;

export const Button: FC<ButtonProps> = ({ children, ...otherProps  }) => {
    return (
        <Styled
            { ...otherProps }>
            {children}
        </Styled>
    );
};


// background: radial-gradient(ellipse, #DfDfDf 0%, #FFF 60%);
// border-image: linear-gradient(to right, #FFF, #933a, #724, #FFF ) 47% 0%;

// border: 2px solid #147;
// border-bottom: 2px solid #FFF;
