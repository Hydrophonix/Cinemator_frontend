// Core
import styled from 'styled-components';

// Styles
import { EntityContainer, EntityHeader, EntitiesScrollList } from '../styles';

export const Container = styled(EntityContainer)`
    background-color: ${({ theme }) => theme.requisite.containerBg};
`;

export const Header = styled(EntityHeader)`
    background-color: ${({ theme }) => theme.requisite.secondary};

    @media (max-width: 375px) {
        h2 {
            font-size: 0px;
        }
    }
`;

export const ScrollList = styled(EntitiesScrollList)``;
