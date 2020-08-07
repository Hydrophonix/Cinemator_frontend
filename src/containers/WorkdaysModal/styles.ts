// Core
import styled from 'styled-components';

// Styles
import { ModalHeader, ModalFooter } from '../styles';

export const Header = styled(ModalHeader)`
    background-color: ${({ theme }) => theme.workday.secondary};
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
