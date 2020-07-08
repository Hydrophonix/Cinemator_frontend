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
import { CreateProjectContainer } from './styles';

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
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createProject({
            variables: {
                input: {
                    title:    form.title,
                    startDay: transformDateToISO8601(startDate),
                    endDay:   transformDateToISO8601(endDate),
                },
            },
        });

        response && response.data && void goBack();
    };

    return (
        <CreateProjectContainer>
            <nav>
                <Button onClick = { goBack }>Back</Button>
            </nav>
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
                        endDate = { endDate }
                        selected = { startDate }
                        startDate = { startDate }
                        onChange = { (date) => date && void setStartDate(date) }
                    />
                    <h2>Project end:</h2>
                    <DatePicker
                        selectsEnd
                        endDate = { endDate }
                        minDate = { startDate }
                        selected = { endDate }
                        startDate = { startDate }
                        onChange = { (date) => date && void setEndDate(date) }
                    />
                    <Button type = 'submit'>Submit</Button>
                </form>
            </main>
        </CreateProjectContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateProject />
    </ErrorBoundary>
);
