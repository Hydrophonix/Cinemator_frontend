// Core
import styled from 'styled-components';

export const TopbarContainer = styled.header`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    justify-content: space-between;
    background-color: lightblue;

    h1 {
        color: #000;
        font-size: 30px;
    }
`;

export const Logo = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
`;
