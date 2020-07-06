// Core
import styled from 'styled-components';

// Instrumnets
import { ORANGE } from '../../assets/globalStyles';

export const RequisiteContainer = styled.section`
    width: 100%;
`;

export const RequisiteHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${ORANGE.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
