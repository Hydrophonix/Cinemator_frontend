// Core
import styled from 'styled-components';

export const Main = styled.main`
    max-height: 420px;
    min-height: 420px;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.scene.hoverSecondary}
`;

export const Footer = styled.footer`
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
`;
