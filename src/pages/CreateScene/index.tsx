// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Textarea } from '../../elements';

// Apollo
import { useCreateSceneMutation } from '../../bus/Scene';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useForm } from '../../hooks';

// Styles
import { Container, Header, CreateInputs } from './styles';

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
    const [ createScene, { loading: createSceneLoading }] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm<SceneCreateInput>(innitialForm);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createScene({ variables: { input: form, projectId }});
        response && response.data && void push(`/${projectId}/scenes/${response.data.createScene.id}`);
    };

    return (
        <Container>
            {createSceneLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = 'Back to scenes'
                        onClick = { () => push(`/${projectId}/scenes`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Create scene</h2>
            </Header>
            <CreateInputs>
                <section>
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
                        Create
                    </Button>
                </section>
            </CreateInputs>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateScene />
    </ErrorBoundary>
);
