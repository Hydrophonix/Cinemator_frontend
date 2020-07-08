// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // TODO: duplicate css ?

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useCreateWorkdayMutation } from '../../bus/Workday';

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
    const [ startDate, setStartDate ] = useState(new Date(date));
    const [ createWorkday ] = useCreateWorkdayMutation({ projectId });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createWorkday({
            variables: {
                input: {
                    title: form.title,
                    date:  transformDateToISO8601(startDate),
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
                    <DatePicker
                        disabled
                        selected = { startDate }
                        onChange = { (date) => date && void setStartDate(date) }
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
