// Core
import styled from 'styled-components';

// Instruments
import { BLUE } from '../../assets/globalStyles';

export const SceneContainer = styled.section`
    width: 100%;
    background-color: ${BLUE.containerBg};
`;

export const SceneHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${BLUE.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
