// Core
import styled from 'styled-components';

// Styles
import { ModalHeader, ModalFooter } from '../styles';

export const Header = styled(ModalHeader)`
    background-color: ${({ theme }) => theme.requisite.secondary};
`;

export const Footer = styled(ModalFooter)`
    justify-content: space-between;
    background-color: ${({ theme }) => theme.requisite.primary};
`;
