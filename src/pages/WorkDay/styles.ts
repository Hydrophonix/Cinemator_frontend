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
    background-color: ${({ theme }) => theme.workday.anotherSecondary};
    min-height: 35px;
    box-sizing: border-box;

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        min-width: 160px;
        text-align: center
    }

    nav {
        &:last-child {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
        }
    }
`;

export const Description = styled.section`
    display: flex;
    background-color: ${({ theme }) => theme.workday.anotherSecondary};
    font-family: sans-serif;
    padding: 5px 10px;
    justify-content: center;
    border-top: 0.5px solid #fff;

    p {
        font-size: 18px;
        color: #fff;
    }
`;
