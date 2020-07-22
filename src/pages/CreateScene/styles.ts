// Core
import styled from 'styled-components';

export const CreateSceneContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.scene.containerBg};

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
                margin-top: 5px;
            }
        }
    }
`;

export const Header = styled.header`
    display: grid;
    box-sizing: border-box;
    grid-template-columns: 15% 70% 15%;
    padding: 5px;
    align-items: center;
    background-color: ${({ theme }) => theme.scene.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        text-align: center;
    }
`;
