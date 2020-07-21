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
import { useInputsRedux } from '../../@init/redux/inputs';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { CreateWorkdayContainer, Header } from './styles';

const innitialForm = {
    date:        '',
    description: '',
};

export type Params = {
    projectId: string
    date: string
}

const CreateWorkday: FC = () => {
    const { goBack } = useHistory();
    const { projectId, date } = useParams<Params>();
    const [ form, setForm ] = useForm<typeof innitialForm>(innitialForm);
    const { setDateRangeRedux } = useInputsRedux();
    const [ createWorkday ] = useCreateWorkdayMutation({ projectId, setDateRangeRedux });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createWorkday({
            variables: {
                input: {
                    date:        transformDateToISO8601(new Date(date)),
                    description: form.description,
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
                    <h2>Workday date:</h2>
                    <input
                        disabled
                        readOnly
                        value = { date }
                    />
                    <h2>Workday description:</h2>
                    <input
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description }
                        onChange = { setForm }
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
