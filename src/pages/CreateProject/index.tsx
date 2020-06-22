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
// import { useCreateProjectMutation } from '../../bus';

const innitialForm = {
    title: '',
};

const CreateProject: FC = () => {
    const { goBack } = useHistory();
    // const [ createProject ] = useCreateProjectMutation();
    const [ form, setForm ] = useForm(innitialForm);

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const onSubmit = async (event: any) => {
        event.preventDefault();
        await console.log(event);

        // const response = await login({
        //     variables: { input: { email, password } },
        // });

        // if (response && response.data) {
        //     setAccessToken(response.data.loginWeb.accessToken);
        // }
    };

    return (
        <CreateProjectContainer>
            <nav>
                <Button onClick = { () => goBack() }>
                    Back
                </Button>
            </nav>
            <main>
                <form onSubmit = { (event) => onSubmit(event) }>
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
                        onChange = { (date) => date && setStartDate(date) }
                    />
                    <h2>Project end:</h2>
                    <DatePicker
                        selectsEnd
                        endDate = { endDate }
                        minDate = { startDate }
                        selected = { endDate }
                        startDate = { startDate }
                        onChange = { (date) => date && setEndDate(date) }
                    />
                    <button type = 'submit'>Submit</button>
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
