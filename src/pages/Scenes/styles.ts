// Core
import styled from 'styled-components';

// Instruments
import { BLUE } from '../../assets';

export const ScenesContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
        display: flex;
        justify-content: space-between;
        padding:  5px;
        box-sizing: border-box;
        background-color: ${BLUE.secondary};

        section {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }
`;
