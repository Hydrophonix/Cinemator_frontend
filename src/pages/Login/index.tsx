// Core
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner } from '../../elements';

// Apollo
import { useLoginMutation } from '../../bus/Auth';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
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
    const [ login, { loading: loginLoading }] = useLoginMutation();
    const [ form, setForm ] = useForm<AuthInput>(innitialForm);
    const [ isPasswordVisible, setPasswordVisible ] = useState(false);
    const { togglersRedux: { isOnline }, setIsLoggedIn } = useTogglersRedux();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await login({ variables: { input: form }});

        if (response && response.data) {
            setAccessToken(response.data.loginWeb.accessToken);
            setIsLoggedIn(true);
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
                <Button
                    disabled = { !isOnline }
                    type = 'submit'>
                    Submit
                </Button>
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
