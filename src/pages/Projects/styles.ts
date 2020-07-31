// Core
import styled from 'styled-components';
// TODO: refactor
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.project.containerBg};
    
    nav {
        display: flex;
        justify-content: center;
        padding-top: 10px;
    }

    main {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 5%;
        justify-content: center;
    }
`;

export const Header = styled.header`
    box-shadow: 5px 0px 5px 0px rgba(0,0,0,0.75);
    display: grid;
    padding:  5px;
    box-sizing: border-box;
    grid-template-columns: 20% 60% 20%;
    background-color: ${({ theme }) => theme.project.primary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        text-align: center;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;
