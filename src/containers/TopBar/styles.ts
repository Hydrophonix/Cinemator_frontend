// Core
import styled from 'styled-components';

export const TopbarContainer = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    justify-content: space-between;
    background-color: #216ba5;

    h1 {
        color: #fff;
        font-size: 35px;
        font-family: TerminatorFont;
    }
`;

export const Logo = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
`;
