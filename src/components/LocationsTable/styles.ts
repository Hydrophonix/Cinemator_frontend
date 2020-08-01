import styled from 'styled-components';

// Styles
import { TableStyles, TheadStyles, TbodyStyles } from '../styles';

export const Table = styled(TableStyles)``;

export const Thead = styled(TheadStyles)`
    tr {
        background-color: ${({ theme }) => theme.scene.primary};
        color: #fff;

        th {
            text-align: center;
        }
    }
`;

export const Tbody = styled(TbodyStyles)`
    tr {
        background-color: ${({ theme }) => theme.scene.locationPrimary};
        color: #fff;
        border-bottom: 1px solid ${({ theme }) => theme.scene.primary};

        &:hover {
            background-color: ${({ theme }) => theme.scene.hoverSecondary};
        }
    }
`;
