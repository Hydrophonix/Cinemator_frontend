// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input } from '../../elements';

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
    number:      0,
    title:       '',
    description: '',
};

const CreateScene: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createScene ] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm<SceneCreateInput>(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createScene({ variables: { input: form, projectId }});
        response && response.data && void push(`/${projectId}/scenes/${response.data.createScene.id}`);
    };

    return (
        <CreateSceneContainer>
            <Header>
                <div>
                    <Button
                        title = 'Back to scenes'
                        onClick = { () => push(`/${projectId}/scenes`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Create scene</h2>
            </Header>
            <main>
                <div>
                    <h2>Scene number:</h2>
                    <Input
                        name = 'number'
                        type = 'number'
                        value = { form.number }
                        onChange = { (event) => setForm(event, true) }
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
                    <Button onClick = { onSubmit }>Submit</Button>
                </div>
            </main>
        </CreateSceneContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateScene />
    </ErrorBoundary>
);
