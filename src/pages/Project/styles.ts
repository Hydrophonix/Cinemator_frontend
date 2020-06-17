// Core
import styled from 'styled-components';

export const ProjectContainer = styled.div`
    display: flex;
    height: 100%;

    aside {
        min-width:200px;
        background-color: lightblue;
        border-right: 1px solid black;
        padding: 15px;
        box-sizing: border-box;

        ul {
            display: flex;
            flex-direction: column;
            padding-top: 20px;

            li {
                padding: 5px 0px 5px 20px;

                a {
                    font-size: 20px;
                    text-decoration: none;
                    color: #216ba5;
                    font-size: 26px;
                }
            }
        }
    }
`;
