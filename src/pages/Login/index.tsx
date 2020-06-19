// Core
import React, { FC, useState } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Hooks
import { useLoginMutation } from '../../bus';

// Instruments
import { setAccessToken } from '../../tokenStore';

type LoginProps = {}

const Login:FC<LoginProps> = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ login ] = useLoginMutation();

    return (
        <div>
            <div>KEK LOGIN</div>
            <form onSubmit = { async (event) => {
                event.preventDefault();
                const response = await login({
                    variables: { input: { email, password }},
                });

                if (response && response.data) {
                    setAccessToken(response.data.loginWeb.accessToken);
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
                    <button type = 'submit'>Login!1!</button>
                </div>
            </form>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Login />
    </ErrorBoundary>
);
