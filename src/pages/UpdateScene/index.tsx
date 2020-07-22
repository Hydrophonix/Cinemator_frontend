// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary, LocationsModal } from '../../components';

// Elements
import { Button, Input } from '../../elements';

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
    const { push } = useHistory();
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

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await updateScene({ variables: { input: form, sceneId }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <Container>
            <Route
                exact
                path = { '/:projectId/update-scene/:sceneId/locations' }>
                <LocationsModal
                    closeHandler = { () => void push(`/${projectId}/scenes`) }
                />
            </Route>
            <Header>
                <div>
                    <Button onClick = { () => push(`/${projectId}/scenes/${sceneId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Update scene: {scene.number}</h2>
            </Header>
            <main>
                <h2>Number:</h2>
                <Input
                    name = 'number'
                    type = 'number'
                    value = { form.number ?? 0 }
                    onChange = { (event) => void setForm(event, true) }
                />
                <h2>Location:</h2>
                <Button
                    style = {{ width: 200, fontSize: 20 }}
                    onClick = { () => push(`/${projectId}/update-scene/${sceneId}/locations`) }>
                    {form.location || 'Choose Location'}
                </Button>
                <h2>Description:</h2>
                <textarea
                    name = 'description'
                    placeholder = 'Description'
                    value = { form.description || '' }
                    onChange = { setForm }
                />
                <Button onClick = { onSubmit }>Update</Button>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateScene />
    </ErrorBoundary>
);
