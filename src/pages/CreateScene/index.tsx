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
import { CreateSceneContainer, Header } from './styles';

// Types
import { SceneCreateInput } from '../../@types/graphql-global-types';

export type Params = {
    projectId: string
}

const innitialForm = {
    location:    '',
    number:      0,
    description: '',
};

const CreateScene: FC = () => {
    const { goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createScene ] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm<SceneCreateInput>(innitialForm);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await createScene({ variables: { input: form, projectId }}); // TODO ???
        response && response.data && void goBack();
    };

    return (
        <CreateSceneContainer>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Create scene</h2>
                <div />
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Scene number:</h2>
                    <input
                        name = 'number'
                        type = 'number'
                        value = { form.number }
                        onChange = { (event) => setForm(event, true) }
                    />
                    <h2>Scene location:</h2>
                    <input
                        name = 'location'
                        placeholder = 'Scene location'
                        value = { form.location || '' }
                        onChange = { setForm }
                    />
                    <h2>Scene description:</h2>
                    <input
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Submit</Button>
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
