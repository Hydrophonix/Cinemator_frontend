// Core
import React, { FC, Ref, DetailedHTMLProps } from 'react';
import styled from 'styled-components';

// Styles
const HeaderContainer = styled.header`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    h1 {
        padding-left: 15px;
        font-family: sans-serif;
        font-size: 24px;
        color: #fff;
    }
`;

type PropTypes = {
    children: string
    ref?: Ref<HTMLElement>;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const ModalHeader: FC<PropTypes> = ({ children = '', ...otherProps }) => (
    <HeaderContainer { ...otherProps }>
        <h1>{children}</h1>
    </HeaderContainer>
);

