// Core
import styled from 'styled-components';

export const WorkdayContainer = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const WorkdayHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${({ theme }) => theme.workday.primary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
