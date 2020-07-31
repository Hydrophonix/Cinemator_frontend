// Core
import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useMeQuery, useUpdateMeMutation } from '../../bus/Auth';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { Button, Input, Spinner } from '../../elements';

// Styles
import { Container, Header, UpdateInputs } from './styles';

// Types
import { UserUpdateInput } from '../../@types/graphql-global-types';

const innitialForm = {
    email: '',
    name:  '',
    phone: '',
};

const Profile: FC = () => {
    const { push } = useHistory();
    const { data, loading } = useMeQuery();
    const [ updateMe, { loading: updateMeLoading }] = useUpdateMeMutation();
    const [ form, setForm, setInitialForm ] = useForm<UserUpdateInput>(innitialForm);

    useEffect(() => {
        data && void setInitialForm({
            email: data.me.email,
            name:  data.me.name ?? '',
            phone: data.me.phone ?? '',
        });
    }, [ data ]);

    if (loading || !data) {
        return <Spinner />;
    }

    const onSubmit = async () => void await updateMe({ variables: { input: form }});

    return (
        <Container>
            {updateMeLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = 'Back to projects'
                        onClick = { () => void push('/') }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Profile</h2>
            </Header>
            <UpdateInputs>
                <section>
                    <h2>User email:</h2>
                    <Input
                        name = 'email'
                        placeholder = 'Email'
                        value = { form.email || '' }
                        onChange = { setForm }
                    />
                    <h2>User name:</h2>
                    <Input
                        name = 'name'
                        placeholder = 'Name'
                        value = { form.name || '' }
                        onChange = { setForm }
                    />
                    <h2>User phone:</h2>
                    <Input
                        name = 'phone'
                        placeholder = 'Phone'
                        value = { form.phone || '' }
                        onChange = { setForm }
                    />
                    <Button onClick = { onSubmit }>Update</Button>
                    <Button>Logout</Button>
                </section>
            </UpdateInputs>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>
);
