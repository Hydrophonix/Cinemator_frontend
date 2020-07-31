// Core
import styled from 'styled-components';

// Styles
import { EntityContainer, EntityHeader, EntityInputs } from '../styles';

export const Container = styled(EntityContainer)`
    background-color: ${({ theme }) => theme.project.containerBg};
    flex: 1;
`;

export const Header = styled(EntityHeader)`
    background-color: ${({ theme }) => theme.project.primary};
`;

export const CreateInputs = styled(EntityInputs)``;
