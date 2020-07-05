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
    const [ createScene ] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const response = await createScene({
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
                        onChange = { (event) => setForm(event, true) }
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
