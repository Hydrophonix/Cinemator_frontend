// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Apollo hooks
import { useCreateWorkdayMutation } from '../../bus/Workday';

// Hooks
import { useForm } from '../../hooks';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { CreateWorkdayContainer, Header } from './styles';

const innitialForm = {
    title: '',
};

export type Params = {
    projectId: string
    date: string
}

const CreateWorkday: FC = () => {
    const { goBack } = useHistory();
    const { projectId, date } = useParams<Params>();
    const [ form, setForm ] = useForm<typeof innitialForm>(innitialForm);
    const { setDateRange } = useReduxInputs();
    const [ createWorkday ] = useCreateWorkdayMutation({ projectId, setDateRange });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createWorkday({
            variables: {
                input: {
                    title: form.title,
                    date:  transformDateToISO8601(new Date(date)),
                },
                projectId,
            },
        });

        response && response.data && void goBack();
    };

    return (
        <CreateWorkdayContainer>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Create workday {date}</h2>
                <div/>
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Workday title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Workday title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    <input
                        disabled
                        readOnly
                        value = { date }
                    />
                    <Button type = 'submit'>Submit</Button>
                </form>
            </main>
        </CreateWorkdayContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateWorkday />
    </ErrorBoundary>
);
