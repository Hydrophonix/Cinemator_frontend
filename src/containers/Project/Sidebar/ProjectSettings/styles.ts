// Core
import styled from 'styled-components';

export const Header = styled.header`
    h2 {
        font-size: 24px;
        color: #fff;
        font-family: sans-serif;
    }
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px 0px;

    h2 {
        font-size: 18px;
        color: #fff;
        padding: 5px 0px;
        font-family: sans-serif;
    }

    input {
        width: 100%;
        box-sizing: border-box;
    }
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
`;

export const WorkdaysSettings = styled.section`
    display: flex;
    justify-content: space-between;

    button {
        width: 100%;
    }
`;

