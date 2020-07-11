// Core
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.project.containerBg};

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        form {
            display: flex;
            flex-direction: column;

            h2 {
                font-size: 18px;
                padding: 5px 0px;
            }

            button {
                margin-top: 5px;
            }
        }
    }
`;

export const Header = styled.header`
    display: grid;
    padding:  5px;
    box-sizing: border-box;
    grid-template-columns: 15% 70% 15%;
    background-color: ${({ theme }) => theme.project.primary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        text-align: center;
    }
`;
