// Core
import styled from 'styled-components';

// Styles
import { EntityContainer, EntityHeader, EntitiesScrollList } from '../../styles';

export const Container = styled(EntityContainer)`
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const Header = styled(EntityHeader)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.workday.secondary};

    @media (max-width: 375px) {
        h2 {
            font-size: 0px;
        }
    }
`;

export const ScrollList = styled(EntitiesScrollList)``;
