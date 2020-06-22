// Core
import styled from 'styled-components';

export const CreateProjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: lightblue;
    
    nav {
        display: flex;
    }

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
