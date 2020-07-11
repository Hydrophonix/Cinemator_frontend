// Core
import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.scene.containerBg};
    flex: 1;

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
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.scene.secondary};
    grid-template-columns:  15% 70% 15%;
    padding: 10px;

    div {
        display: flex;
        flex-wrap: wrap;
    }
        align-items: center;
    
    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        padding: 0px 10px;
        text-align: center;
    }
`;
