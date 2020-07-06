// Core
import styled from 'styled-components';

// Instruments
import { GREEN } from '../../assets/globalStyles';

export const WorkdayContainer = styled.section`
    width: 100%;
`;

export const WorkdayHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${GREEN.main};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
