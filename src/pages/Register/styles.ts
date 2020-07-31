// Core
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// TODO: refactor
export const RegisterContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: ${({ theme }) => theme.app.secondary};

    padding-top: 5%;

    h1 {
        font-size: 24px;
        font-family: sans-serif;
        margin-bottom: 5px;
    }

    form {
        display: flex;
        flex-direction: column;

        input {
            margin-bottom: 5px;
        }
    }
`;

export const LoginLink = styled(Link)`
    text-decoration: underline;
    padding-top: 10px;
    font-family: sans-serif;
`;

export const RelativeContainer = styled.div`
    position: relative;
    
    svg {
        position: absolute;
        top: 7px;
        right: 5px;
        opacity: 0.7;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }
`;
