// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useCreateSceneMutation } from '../../bus/Scene';

// Styles
import { CreateSceneContainer } from './styles';

const innitialForm = {
    sceneNumber: 0,
    title:       '',
    location:    '',
};

export type Params = {
    projectId: string
}

const CreateScene: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createScene ] = useCreateSceneMutation();
    const [ form, setForm ] = useForm(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const response = await createScene({ // TODO: DO NOT TESTED, ONLY WRITED
            variables: {
                input: {
                    title:       form.title,
                    sceneNumber: form.sceneNumber,
                    location:    form.location,
                },
                projectId,
                workdayId: '', // TODO: ???
            },
        });

        if (response && response.data) {
            push(`/${projectId}/scenes`);
            console.log('onSubmit -> response.data', response.data);
        }
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
