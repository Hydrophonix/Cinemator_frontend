// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useLoginMutation } from '../../bus';
import { useReduxTogglers } from '../../redux/togglers';
import { useForm } from '../../hooks';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';

// Styles
import { LoginContainer, RegisterLink } from './styles';

const innitialForm = {
    email:    '',
    password: '',
};

const Login: FC = () => {
    const [ login ] = useLoginMutation();
    const { togglerCreator } = useReduxTogglers();
    const [ form, setForm ] = useForm(innitialForm); // TODO: TYPES

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const response = await login({
            variables: { input: form },
        });

        if (response && response.data) {
            setAccessToken(response.data.loginWeb.accessToken);
            togglerCreator('isAuthenticated', true);
        }
    };

    return (
        <LoginContainer>
            <h1>Login</h1>

            <form onSubmit = { onSubmit }>
                <input
                    name = 'email'
                    placeholder = 'enter email'
                    value = { form.email }
                    onChange = { setForm }
                />

                <input
                    name = 'password'
                    placeholder = 'enter password'
                    value = { form.password }
                    onChange = { setForm }
                />

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
