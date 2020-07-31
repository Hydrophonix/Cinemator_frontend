// Core
import styled from 'styled-components';

// Styles
import { ModalMain, ModalFooter } from '../styles';

export const Main = styled(ModalMain)`
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Footer = styled(ModalFooter)`
    background-color: ${({ theme }) => theme.scene.primary};
`;
