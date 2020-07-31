// Core
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Toggle } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useScenesQuery, useUpdateSceneMutation } from '../../bus/Scene';

// Styles
import { Container, Header, UpdateInputs } from './styles';

// Types
import { SceneUpdateInput } from '../../@types/graphql-global-types';

type Params = {
    projectId: string
    sceneId: string
}

const initialForm = {
    sceneNumber: 0,
    title:       '',
    description: '',
};

const UpdateScene: FC = () => {
    const { push } = useHistory();
    const { projectId, sceneId } = useParams<Params>();
    const { data, loading } = useScenesQuery({ projectId });
    const [ updateScene, { loading: updateSceneLoading }] = useUpdateSceneMutation();
    const [ form, setForm, setInitialForm ] = useForm<SceneUpdateInput>(initialForm);
    const [ isCompleted, setIsCompleted ] = useState(false);
    const scene = data?.scenes.find((scene) => scene.id === sceneId);

    useEffect(() => {
        if (scene) {
            setInitialForm({
                number:      scene.number,
                title:       scene.title || '',
                description: scene.description || '',
            });
            setIsCompleted(scene.isCompleted);
        }
    }, [ scene ]);

    if (loading || !data || !scene) {
        return <Spinner />;
    }

    const onSubmit = async () => {
        const response = await updateScene({ variables: { input: { ...form, isCompleted }, sceneId }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <Container>
            {updateSceneLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = { `Back to S:${scene.number}` }
                        onClick = { () => push(`/${projectId}/scenes/${sceneId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Update S:{scene.number}</h2>
            </Header>
            <UpdateInputs>
                <section>
                    <h2>Scene condition:</h2>
                    <Toggle
                        active = { isCompleted }
                        text = { isCompleted ? 'Completed' : 'In progress' }
                        onChange = { setIsCompleted }
                    />
                    <h2>Scene number:</h2>
                    <Input
                        name = 'number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => void setForm(event, true) }
                    />
                    <h2>Scene title:</h2>
                    <Input
                        name = 'title'
                        value = { form.title || '' }
                        onChange = { setForm }
                    />
                    <h2>Scene description:</h2>
                    <textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button onClick = { onSubmit }>Update</Button>
                </section>
            </UpdateInputs>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateScene />
    </ErrorBoundary>
);
