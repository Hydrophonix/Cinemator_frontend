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
        background-color: transparent;
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

export const ScenesCount = styled.div`
    text-align: center;
    font-size: 14px;
    background-color: ${({ theme }) => theme.scene.secondary};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 2px 0px;
    white-space: break-spaces;
`;

export const RequisitesCount = styled.div`
    padding: 2px 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: center;
    font-size: 14px;
    background-color: ${({ theme }) => theme.requisite.secondary};
    white-space: break-spaces;
`;
