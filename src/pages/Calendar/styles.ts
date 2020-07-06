// Core
import styled from 'styled-components';

// Instruments
import { GREEN, BLUE, ORANGE } from '../../assets/globalStyles';

export const CalendarContainer = styled.section`
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .emptyDay {
        cursor: pointer;
    }

    .todayInsetShadow {
        box-shadow: inset 0px 0px 0px 3px ${ORANGE.secondary};
    }

    .workday {
        background-color: ${GREEN.secondary};
        cursor: pointer;
    }

    .rbc-event {
        background-color: ${BLUE.secondary};

        &:hover {
            background-color: ${BLUE.hoverSecondary};
        }
    }
`;

export const CustomToolbarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-family: sans-serif;
    background-color: ${GREEN.main};
    color: white;
    padding: 5px;
`;
