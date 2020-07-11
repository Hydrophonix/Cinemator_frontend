// Core
import styled from 'styled-components';

export const CalendarContainer = styled.section`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .emptyDay {
        cursor: pointer;
    }

    .todayInsetShadow {
        box-shadow: inset 0px 0px 0px 3px orange;
    }

    .workday {
        background-color: ${({ theme }) => theme.workday.secondary};
        cursor: pointer;
    }

    .rbc-event {
        background-color: ${({ theme }) => theme.scene.secondary};

        &:hover {
            background-color: ${({ theme }) => theme.scene.hoverSecondary};
        }
    }
`;

export const CustomToolbarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-family: sans-serif;
    background-color: ${({ theme }) => theme.workday.primary};
    color: white;
    padding: 5px;
`;
