// Core
import styled from 'styled-components';

export const ProjectContainer = styled.div`
    display: flex;
    height: 100%;

    aside {
        width: 200px;
        background-color: lightgrey;
        padding: 15px;
        box-sizing: border-box;

        ul {
            display: flex;
            flex-direction: column;

            li {
                
                a {
                    font-size: 20px;
                    text-decoration: none;
                }

            }
        }
    }
`;
