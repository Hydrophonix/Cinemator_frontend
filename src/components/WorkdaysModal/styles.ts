// Core
import styled from 'styled-components';

export const Main = styled.main`
    max-height: 410px;
    min-height: 410px;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const Section = styled.section`
    padding: 5px;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.workday.primary};
`;

export const Footer = styled.footer`
    background-color: ${({ theme }) => theme.workday.primary};
    padding: 10px;
    display: flex;
    justify-content: flex-end;
`;
