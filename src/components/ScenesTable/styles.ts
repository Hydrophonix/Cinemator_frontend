import styled from 'styled-components';

// Styles
import { TableStyles, TheadStyles, TbodyStyles, NavCellStyles } from '../styles';

export const Table = styled(TableStyles)``;

export const Thead = styled(TheadStyles)`
    tr {
        background-color: ${({ theme }) => theme.scene.primary};
        color: #fff;
    }
`;

export const Tbody = styled(TbodyStyles)`
    tr {
        background-color: ${({ theme }) => theme.scene.secondary};
        color: #fff;
        border-bottom: 1px solid ${({ theme }) => theme.scene.primary};

        &:hover {
            background-color: ${({ theme }) => theme.scene.hoverSecondary};
        }
    }
`;

export const NavCell = styled(NavCellStyles)`
    span {
        background-color: #fff;
    }

    &:hover {
        span {
            background-color: ${({ theme }) => theme.scene.secondary};

            svg {
                path {
                    fill: #fff;
                }
            }
        }
    }
`;
