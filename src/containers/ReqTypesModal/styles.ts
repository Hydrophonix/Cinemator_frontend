// Core
import styled from 'styled-components';

// Styles
import { ModalHeader, ModalFooter, ModalIconsContainer, ModalIcon } from '../styles';

export const Header = styled(ModalHeader)`
    background-color: ${({ theme }) => theme.requisite.primary};
`;

export const Footer = styled(ModalFooter)`
    background-color: ${({ theme }) => theme.requisite.primary};
`;

export const IconsContainer = styled(ModalIconsContainer)`
    background-color: ${({ theme }) => theme.requisite.secondary};
`;

export const Icon = styled(ModalIcon)`
    svg {
        &:hover {
            path {
                fill: ${({ theme }) => theme.requisite.secondary};
            }
        }
    }
`;
