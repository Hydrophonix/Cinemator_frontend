// Core
import React, { FC, useState } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Instruments
import { setAccessToken } from '../../tokenStore';

// Types
import { useRegisterMutation } from '../../bus';

// Assets
import { RegisterContainer } from './styles';

type RegisterProps = {}

const Register: FC<RegisterProps> = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ login ] = useRegisterMutation();

    return (
        <RegisterContainer>
            <div>KEK LOGIN</div>
            <form onSubmit = { async (event) => {
                event.preventDefault();
                const response = await login({
                    variables: { input: { email, password }},
                });

                if (response && response.data) {
                    setAccessToken(response.data.registerWeb.accessToken);
                }
            } }>
                <div>
                    <input
                        placeholder = 'enter email'
                        value = { email }
                        onChange = { (event) => setEmail(event.target.value) }
                    />
                </div>
                <div>
                    <input
                        placeholder = 'enter password'
                        value = { password }
                        onChange = { (event) => setPassword(event.target.value) }
                    />
                </div>
                <div>
                    <button type = 'submit'>Register</button>
                </div>
            </form>
        </RegisterContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Register />
    </ErrorBoundary>
);

