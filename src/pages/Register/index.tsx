// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Hooks
import { useForm } from '../../hooks';

// Instruments
import { setAccessToken } from '../../tokenStore';

// Types
import { useRegisterMutation } from '../../bus';

// Styles
import { RegisterContainer } from './styles';

const innitialForm = {
    email:    '',
    password: '',
};

const Register: FC = () => {
    const [ register ] = useRegisterMutation();
    const [ form, setForm ] = useForm(innitialForm); // TODO: TYPES

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await register({
            variables: { input: form },
        });

        if (response && response.data) {
            setAccessToken(response.data.registerWeb.accessToken);
        }
    };

    return (
        <RegisterContainer>
            <h1>Register in Cinemator</h1>
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

                <button type = 'submit'>Register</button>
            </form>
        </RegisterContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Register />
    </ErrorBoundary>
);

