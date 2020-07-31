// Core
import styled from 'styled-components';

// Styles
import { ModalMain, ModalFooter } from '../styles';

export const Main = styled(ModalMain)`
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const Footer = styled(ModalFooter)`
    background-color: ${({ theme }) => theme.workday.primary};
`;

export const Section = styled.section`
    padding: 5px;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.workday.primary};
`;
