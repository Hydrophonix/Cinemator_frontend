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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
                <h2>User: {data.me.email}</h2>
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Email:</h2>
                    <Input
                        name = 'email'
                        placeholder = 'Email'
                        value = { form.email }
                        onChange = { setForm }
                    />
                    <h2>Name:</h2>
                    <Input
                        name = 'name'
                        placeholder = 'Name'
                        value = { form.name }
                        onChange = { setForm }
                    />
                    <h2>Phone:</h2>
                    <Input
                        name = 'phone'
                        placeholder = 'Phone'
                        value = { form.phone }
                        onChange = { setForm }
                    />

                    <Button type = 'submit'>Update</Button>
                </form>
                <Button style = {{ marginTop: '10px' }}>Logout</Button>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>
);
