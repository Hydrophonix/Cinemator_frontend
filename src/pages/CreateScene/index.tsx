// Core
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
// import { useCreateProjectMutation } from '../../bus/Project';

// Styles
import { CreateSceneContainer } from './styles';

const innitialForm = {
    sceneNumber: 0,
    title:       '',
    location:    '',
};

const CreateScene: FC = () => {
    const { push, goBack } = useHistory();
    // const [ createProject ] = useCreateProjectMutation();
    const [ form, setForm ] = useForm(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        // const response = await createProject({
        //     variables: {
        //         input: {
        //             title:    form.title,
        //             startDay: transformDateToISO8601(startDate),
        //             endDay:   transformDateToISO8601(endDate),
        //         },
        //     },
        // });

        // if (response && response.data) {
        //     push('/');
        //     console.log('onSubmit -> response.data', response.data);
        // }
    };

    return (
        <CreateSceneContainer>
            <nav>
                <Button onClick = { () => goBack() }>
                    Back
                </Button>
            </nav>
            <main>
                <form onSubmit = { (event) => onSubmit(event) }>
                    <h2>Scene number:</h2>
                    <input
                        name = 'sceneNumber'
                        type = 'number'
                        value = { form.sceneNumber }
                        onChange = { setForm }
                    />
                    <h2>Scene title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Scene title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    <h2>Scene location:</h2>
                    <input
                        name = 'location'
                        placeholder = 'Scene location'
                        value = { form.location }
                        onChange = { setForm }
                    />

                    <button type = 'submit'>Submit</button>
                </form>
            </main>
        </CreateSceneContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateScene />
    </ErrorBoundary>
);
