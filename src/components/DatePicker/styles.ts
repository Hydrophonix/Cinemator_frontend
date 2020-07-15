// Core
import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;

    span {
        padding: 0px 2px;
        font-family: sans-serif;
        color: #000;
    }
`;

export const CustomDatePickerInput = styled.button`
    cursor: pointer;
    padding: 2px 5px;
    border: none;
    outline: none;
    background-color: #fff;
    font-family: sans-serif;
    color: #000;

    &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.workday.primary};
    }
`;

export const RedoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 2px;
    cursor: pointer;

    &:hover {
        svg > path {
            fill: orange;
        }
    }
`;
