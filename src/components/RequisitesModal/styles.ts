// Core
import styled from 'styled-components';

export const Main = styled.main`
    max-height: 410px;
    min-height: 410px;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.requisite.containerBg};
`;

export const Footer = styled.footer`
    background-color: ${({ theme }) => theme.requisite.primary};
    padding: 10px;
    display: flex;
    justify-content: flex-end;
`;
