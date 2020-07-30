// Core
import React, { FC, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner } from '../../elements';

// Hooks
import { useLoginMutation } from '../../bus';
import { useForm } from '../../hooks';

// Types
import { AuthInput } from '../../@types/graphql-global-types';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';

// Styles
import { LoginContainer, RegisterLink, RelativeContainer } from './styles';

const innitialForm = {
    email:    '',
    password: '',
};

const Login: FC = () => {
    const client = useApolloClient();
    const [ login, { loading: loginLoading }] = useLoginMutation();
    const [ form, setForm ] = useForm<AuthInput>(innitialForm);
    const [ isPasswordVisible, setPasswordVisible ] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await login({ variables: { input: form }});

        if (response && response.data) {
            setAccessToken(response.data.loginWeb.accessToken);
            client.writeData({ data: { isLoggedIn: true }});
        }
    };

    return (
        <LoginContainer>
            {loginLoading && <Spinner absolute />}
            <h1>Login</h1>
            <form onSubmit = { onSubmit }>
                <Input
                    name = 'email'
                    placeholder = 'Enter email'
                    type = 'email'
                    value = { form.email }
                    onChange = { setForm }
                />
                <RelativeContainer>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = { isPasswordVisible ? 'eye-slash' : 'eye' }
                        style = {{ width: 16, height: 16 }}
                        onClick = { () => void setPasswordVisible(!isPasswordVisible) }
                    />
                    <Input
                        name = 'password'
                        placeholder = 'Enter password'
                        type = { isPasswordVisible ? 'text' : 'password' }
                        value = { form.password }
                        onChange = { setForm }
                    />
                </RelativeContainer>
                <Button type = 'submit'>Submit</Button>
            </form>
            <RegisterLink to = '/register'>Register here</RegisterLink>
        </LoginContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Login />
    </ErrorBoundary>
);
