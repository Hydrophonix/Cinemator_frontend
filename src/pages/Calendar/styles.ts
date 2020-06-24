// Core
import styled from 'styled-components';

export const CalendarContainer = styled.section`
    width: 100%;
    height: 100%;
    padding-top: 10px;
    box-sizing: border-box;

    .workday {
        background-color: honeydew;
        cursor: pointer;

        &:hover {
            background-color: lightgreen;
        }
    }

    .emptyDay {
        cursor: pointer;

        &:hover {
            background-color: lightgray;
        }
    }
`;
