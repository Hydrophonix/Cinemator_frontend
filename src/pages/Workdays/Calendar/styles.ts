// Core
import styled, { css } from 'styled-components';

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
        background-color: ${({ theme }) => theme.workday.anotherSecondary};
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
    background-color: ${({ theme }) => theme.workday.anotherSecondary};
    color: white;
    padding: 5px;
`;

const styles = css`
    text-align: center;
    font-size: 14px;
    padding: 2px 0px;
    white-space: break-spaces;
`;

export const ScenesCount = styled.div`
    ${styles};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: ${({ theme }) => theme.scene.secondary};
`;

export const RequisitesCount = styled.div`
    ${styles};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: ${({ theme }) => theme.requisite.secondary};
`;
