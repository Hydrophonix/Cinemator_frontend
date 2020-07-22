// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

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
    sceneNumber: 0,
    title:       '',
    description: '',
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
            number:      scene.number,
            title:       scene.title || '',
            description: scene.description || '',
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
                <div>
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
                </div>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateScene />
    </ErrorBoundary>
);
