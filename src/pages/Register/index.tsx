// Core
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Apollo
import { useRegisterMutation } from '../../bus/Auth';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { Button, Input, Spinner } from '../../elements';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';

// Types
import { AuthInput } from '../../@types/graphql-global-types';

// Styles
import { RegisterContainer, LoginLink, RelativeContainer } from './styles';

const innitialForm = {
    email:    '',
    password: '',
};

const Register: FC = () => {
    const [ register, { loading: registerLoading }] = useRegisterMutation();
    const [ form, setForm ] = useForm<AuthInput>(innitialForm);
    const [ confirm, setConfirm ] = useState('');
    const [ isPasswordVisible, setPasswordVisible ] = useState(false);
    const { togglersRedux: { isOnline }, setIsLoggedIn } = useTogglersRedux();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await register({ variables: { input: form }});

        if (response && response.data) {
            setAccessToken(response.data.registerWeb.accessToken);
            setIsLoggedIn(true);
        }
    };

    const isValid = form.email !== ''
        && form.password !== ''
        && form.password.length >= 6
        && form.password === confirm;

    return (
        <RegisterContainer>
            {registerLoading && <Spinner absolute />}
            <h1>Register</h1>
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
                <RelativeContainer>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = { isPasswordVisible ? 'eye-slash' : 'eye' }
                        style = {{ width: 16, height: 16 }}
                        onClick = { () => void setPasswordVisible(!isPasswordVisible) }
                    />
                    <Input
                        name = 'password'
                        placeholder = 'Confirm password'
                        type = { isPasswordVisible ? 'text' : 'password' }
                        value = { confirm }
                        onChange = { (event) => void setConfirm(event.target.value) }
                    />
                </RelativeContainer>
                <Button
                    disabled = { !isOnline || !isValid }
                    type = 'submit'>
                    Submit
                </Button>
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

