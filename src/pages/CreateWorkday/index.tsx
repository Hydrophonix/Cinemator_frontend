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
import { CreateWorkdayContainer } from './styles';

const innitialForm = {
    title: '',
};

export type Params = {
    projectId: string
    date: string
}

const CreateWorkday: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId, date } = useParams<Params>();
    const [ createWorkday, { loading }] = useCreateWorkdayMutation();
    // console.log('CreateWorkday:FC -> a', loading);

    const [ form, setForm ] = useForm(innitialForm);
    const [ startDate, setStartDate ] = useState(new Date(date));

    const onSubmit = async (event: any) => {
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

        if (response && response.data) {
            push(`/${projectId}/calendar`);
        }
    };

    return (
        <CreateWorkdayContainer>
            <nav>
                <Button onClick = { () => goBack() }>
                    Back
                </Button>
            </nav>
            <main>
                <form onSubmit = { (event) => onSubmit(event) }>
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
                        onChange = { (date) => date && setStartDate(date) }
                    />
                    <button type = 'submit'>Submit</button>
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
