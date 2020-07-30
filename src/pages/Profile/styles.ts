// Core
import styled from 'styled-components';

export const Container = styled.section`
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.project.containerBg};
    flex: 1;

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            display: flex;
            flex-direction: column;

            h2 {
                font-size: 20px;
                padding: 5px 0px;
                font-family: sans-serif;
            }

            button {
                margin-top: 10px;
            }
        }
    }
`;

export const Header = styled.header`
    display: grid;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.project.primary};
    grid-template-columns: 15% 70% 15%;
    padding: 5px;
    align-items: center;

    div {
        display: flex;
        flex-wrap: wrap;
    }
    
    
    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        padding: 0px 10px;
        text-align: center;
    }
`;
