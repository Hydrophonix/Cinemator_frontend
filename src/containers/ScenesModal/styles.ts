// Core
import styled from 'styled-components';

// Styles
import { ModalHeader, ModalFooter } from '../styles';

export const Header = styled(ModalHeader)`
    background-color: ${({ theme }) => theme.scene.secondary};
`;

export const Footer = styled(ModalFooter)`
    background-color: ${({ theme }) => theme.scene.primary};
`;
