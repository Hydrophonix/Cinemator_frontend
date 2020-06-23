// Core
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    background-color: lightblue;

    padding-top: 5%;

    h1 {
        font-size: 24px;
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
`;
