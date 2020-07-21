// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useScenesQuery, useUpdateSceneMutation } from '../../bus/Scene';

// Styles
import { Container, Header } from './styles';

// Types
import { SceneUpdateInput } from '../../@types/graphql-global-types';

type Params = {
    projectId: string
    sceneId: string
}

const initialForm = {
    description: '',
    location:    '',
    sceneNumber: 0,
};

const UpdateScene: FC = () => {
    const { goBack } = useHistory();
    const { projectId, sceneId } = useParams<Params>();
    const { data, loading } = useScenesQuery({ projectId });
    const [ updateScene ] = useUpdateSceneMutation();
    const [ form, setForm, setInitialForm ] = useForm<SceneUpdateInput>(initialForm);
    const scene = data?.scenes.find((scene) => scene.id === sceneId);

    useEffect(() => {
        scene && void setInitialForm({
            location:    scene.location || '',
            description: scene.description || '',
            number:      scene.number,
        });
    }, [ scene ]);

    if (loading || !data || !scene) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await updateScene({ variables: { input: form, sceneId }});
        response && response.data && void goBack();
    };

    return (
        <Container>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Update scene: {scene.number}</h2>
                <div />
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Number:</h2>
                    <input
                        name = 'number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => void setForm(event, true) }
                    />
                    <h2>Location:</h2>
                    <input
                        name = 'location'
                        placeholder = 'Location'
                        value = { form.location || '' }
                        onChange = { setForm }
                    />
                    <h2>Description:</h2>
                    <textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Update</Button>
                </form>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateScene />
    </ErrorBoundary>
);
