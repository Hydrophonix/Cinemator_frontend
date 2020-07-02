// Core
import React, { FC } from 'react';
import styled from 'styled-components';

// Styles
const HeaderContainer = styled.header`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    background-color: blue;

    h1 {
        padding-left: 15px;
        font-family: PacificoRegular;
        font-size: 24px;
        color: #fff;
    }
`;

type PropTypes = {
    children: string;
}

export const ModalHeader: FC<PropTypes> = ({ children = '' }) => (
    <HeaderContainer>
        <h1>{children}</h1>
    </HeaderContainer>
);

