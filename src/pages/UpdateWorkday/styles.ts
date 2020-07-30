// Core
import styled from 'styled-components';

export const UpdateWorkdayContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.workday.containerBg};

    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        nav {
            display: flex;
            flex-direction: column;

            section { 
                width: 100%;
            }

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
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${({ theme }) => theme.workday.anotherSecondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
