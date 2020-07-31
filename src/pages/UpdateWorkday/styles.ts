// Core
import styled from 'styled-components';

// Styles
import { EntityContainer, EntityHeader, EntityInputs } from '../styles';

export const Container = styled(EntityContainer)`
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const Header = styled(EntityHeader)`
    background-color: ${({ theme }) => theme.workday.anotherSecondary};
`;

export const UpdateInputs = styled(EntityInputs)`
    section {
        section {
            width: 100%; /* Datepicker width */
        }
    }
`;
