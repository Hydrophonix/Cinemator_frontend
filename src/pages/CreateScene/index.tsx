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
    title:       '',
    location:    '',
    sceneNumber: 0,
};

const CreateScene: FC = () => {
    const { goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createScene ] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm<SceneCreateInput>(innitialForm);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await createScene({ variables: { input: form, projectId, workdayId: '' }}); // TODO ???
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
                        name = 'sceneNumber'
                        type = 'number'
                        value = { form.sceneNumber }
                        onChange = { (event) => setForm(event, true) }
                    />
                    <h2>Scene title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Scene title'
                        value = { form.title ?? '' }
                        onChange = { setForm }
                    />
                    <h2>Scene location:</h2>
                    <input
                        name = 'location'
                        placeholder = 'Scene location'
                        value = { form.location ?? '' }
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
