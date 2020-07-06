// Core
import styled from 'styled-components';

// Instruments
import { ORANGE } from '../../assets/globalStyles';

export const RequisiteContainer = styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        box-sizing: border-box;
        background-color: ${ORANGE.secondary};

        section {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }
`;
