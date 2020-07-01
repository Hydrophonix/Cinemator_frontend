// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useRegisterMutation } from '../../bus';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { Button } from '../../elements';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';

// Types
import { AuthInput } from '../../@types/graphql-global-types';

// Styles
import { RegisterContainer, LoginLink } from './styles';

const innitialForm = {
    email:    '',
    password: '',
};

const Register: FC = () => {
    const { push } = useHistory();
    const client = useApolloClient();
    const [ register ] = useRegisterMutation();
    const [ form, setForm ] = useForm<AuthInput>(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await register({ variables: { input: form }});

        if (response && response.data) {
            setAccessToken(response.data.registerWeb.accessToken);
            client.writeData({ data: { isLoggedIn: true }});
            push('/');
        }
    };

    return (
        <RegisterContainer>
            <h1>Register</h1>

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
            <LoginLink to = '/login'>Login here</LoginLink>
        </RegisterContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Register />
    </ErrorBoundary>
);

