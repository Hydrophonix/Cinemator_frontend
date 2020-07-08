// Core
import styled from 'styled-components';

// Instruments
import { ORANGE } from '../../assets/globalStyles';

export const RequisiteContainer = styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${ORANGE.containerBg};
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  5px;
    box-sizing: border-box;
    background-color: ${ORANGE.secondary};

    section {
        display: flex;
        flex-direction: column;
        
        nav {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            input {
                max-width: 80px;
            }
        }
    }

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
