// Core
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Toggle, Textarea } from '../../elements';

// Apollo
import { useScenesQuery, useUpdateSceneMutation, useDeleteSceneMutation } from '../../bus/Scene';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useForm } from '../../hooks';

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
    const [ deleteScene, { loading: deleteSceneLoading }] = useDeleteSceneMutation({ projectId, sceneId });
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const [ form, setForm, setInitialForm ] = useForm<SceneUpdateInput>(initialForm);
    const [ isCompleted, setIsCompleted ] = useState(false);
    const scene = data?.scenes.find((scene) => scene.id === sceneId);
    const isSpinnerActive = updateSceneLoading || deleteSceneLoading;

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

    if (loading || !data) {
        return <Spinner />;
    }

    if (!scene) {
        push(`/${projectId}/scenes`);

        return null;
    }

    const onSubmit = async () => {
        const response = await updateScene({ variables: { input: { ...form, isCompleted }, sceneId }});
        response && response.data && void push(`/${projectId}/scenes/${sceneId}`);
    };

    const deleteSceneHandler = async () => {
        const isContinue = window.confirm(`Confirm delete scene: ${scene.number}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteScene();

        if (response?.data?.deleteScene) {
            push(`/${projectId}/scenes`);
        }
        // response && response.data && void
    };

    return (
        <Container>
            {isSpinnerActive  && <Spinner absolute />}
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
                <nav>
                    <Button
                        disabled = { !isOnline }
                        title = 'Delete'
                        onClick = { deleteSceneHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
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
                    <Textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button
                        disabled = { !isOnline }
                        style = {{ width: '100%', padding: 5, fontSize: 18, marginTop: 5 }}
                        onClick = { onSubmit }>
                        Update
                    </Button>
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
