// Core
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Assets
import { Container, Header } from './styles';

// Hooks
import { useForm } from '../../hooks';
import { useCreateProjectMutation } from '../../bus/Project';

// Utils
import { transformDateToISO8601 } from '../../utils';

const innitialForm = {
    title: '',
};

const CreateProject: FC = () => {
    const { goBack } = useHistory();
    const [ createProject ] = useCreateProjectMutation();
    const [ form, setForm ] = useForm<typeof innitialForm>(innitialForm);
    const [ startDay, setStartDay ] = useState(new Date());
    const [ endDay, setEndDay ] = useState(new Date());

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createProject({
            variables: {
                input: {
                    title:    form.title,
                    startDay: transformDateToISO8601(startDay),
                    endDay:   transformDateToISO8601(endDay),
                },
            },
        });

        response && response.data && void goBack();
    };

    return (
        <Container>
            <Header>
                <div>
                    <Button onClick = { goBack }>Back</Button>
                </div>
                <h2>Create project</h2>
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Project title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Project title'
                        onChange = { setForm }
                    />
                    <h2>Project start:</h2>
                    <DatePicker
                        selectsStart
                        endDate = { endDay }
                        selected = { startDay }
                        startDate = { startDay }
                        onChange = { (date) => date && void setStartDay(date) }
                    />
                    <h2>Project end:</h2>
                    <DatePicker
                        selectsEnd
                        endDate = { endDay }
                        minDate = { startDay }
                        selected = { endDay }
                        startDate = { startDay }
                        onChange = { (date) => date && void setEndDay(date) }
                    />
                    <Button type = 'submit'>Submit</Button>
                </form>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateProject />
    </ErrorBoundary>
);
