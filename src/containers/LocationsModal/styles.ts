// Core
import styled from 'styled-components';

// Styles
import { ModalMain, ModalFooter, ModalIconsContainer, ModalIcon } from '../styles';

export const Main = styled(ModalMain)`
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Footer = styled(ModalFooter)`
    background-color: ${({ theme }) => theme.scene.primary};
`;

export const IconsContainer = styled(ModalIconsContainer)`
    background-color: ${({ theme }) => theme.scene.secondary};
`;

export const Icon = styled(ModalIcon)`
    svg {
        &:hover {
            path {
                fill: ${({ theme }) => theme.scene.secondary};
            }
        }
    }
`;
