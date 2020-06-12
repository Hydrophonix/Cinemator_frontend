// Core
import styled from 'styled-components';

export const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 200px auto;
`;

export const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme })=> theme.error}
`;
