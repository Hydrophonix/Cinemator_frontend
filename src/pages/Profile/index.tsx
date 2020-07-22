// Core
import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useMeQuery } from '../../bus/Auth';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { Button, Input } from '../../elements';

// Styles
import { Container, Header } from './styles';

const innitialForm = {
    email: '',
    name:  '',
    phone: '',
};

const Profile: FC = () => {
    const { push } = useHistory();
    const { data, loading } = useMeQuery();
    const [ form, setForm, setInitialForm ] = useForm<typeof innitialForm>(innitialForm);

    useEffect(() => {
        data && void setInitialForm({
            email: data.me.email,
            name:  data.me.name ?? '',
            phone: data.me.phone ?? '',
        });
    }, [ data ]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: any) => {
        await event.preventDefault();

        // const response = await createWorkday({
        //     variables: {
        //         input: {
        //             title: form.title,
        //             date: transformDateToISO8601(startDate),
        //         },
        //         projectId,
        //     },
        // });

        // response && response.data && void goBack();
    };

    return (
        <Container>
            <Header>
                <div>
                    <Button onClick = { () => void push('/') }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>{data.me.email}</h2>
            </Header>
            <main>
                <div>
                    <h2>User email:</h2>
                    <Input
                        name = 'email'
                        placeholder = 'Email'
                        value = { form.email }
                        onChange = { setForm }
                    />
                    <h2>User name:</h2>
                    <Input
                        name = 'name'
                        placeholder = 'Name'
                        value = { form.name }
                        onChange = { setForm }
                    />
                    <h2>User phone:</h2>
                    <Input
                        name = 'phone'
                        placeholder = 'Phone'
                        value = { form.phone }
                        onChange = { setForm }
                    />

                    <Button onClick = { onSubmit }>Update</Button>
                    <Button>Logout</Button>
                </div>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>
);
