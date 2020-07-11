// Core
import styled from 'styled-components';

export const RequisiteContainer = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.requisite.containerBg};
`;

export const RequisiteHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${({ theme }) => theme.requisite.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
