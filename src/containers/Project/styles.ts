// Core
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    main {
        display: flex;
        flex: 1;
    }
`;

export const Header = styled.header`
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

    nav {
        display: flex;
        align-items: center;
    }
`;
