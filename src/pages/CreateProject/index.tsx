// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Textarea } from '../../elements';

// Apollo
import { useCreateProjectMutation } from '../../bus/Project';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useForm } from '../../hooks';

// Styles
import { Container, Header, CreateInputs } from './styles';

// Types
import { ProjectCreateInput } from '../../@types/graphql-global-types';

const innitialForm = {
    title:       '',
    description: '',
};

const CreateProject: FC = () => {
    const { push } = useHistory();
    const [ createProject, { loading: createProjectLoading }] = useCreateProjectMutation();
    const [ form, setForm ] = useForm<ProjectCreateInput>(innitialForm);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createProject({ variables: { input: form }});
        response && response.data && void push(`/${response.data.createProject.id}`);
    };

    return (
        <Container>
            {createProjectLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = 'Back to projects'
                        onClick = { () => void push('/') }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Create project</h2>
            </Header>
            <CreateInputs>
                <section>
                    <h2>Project title:</h2>
                    <Input
                        name = 'title'
                        placeholder = 'Type here...'
                        value = { form.title || '' }
                        onChange = { setForm }
                    />
                    <h2>Project description:</h2>
                    <Textarea
                        name = 'description'
                        placeholder = 'Type here...'
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
        <CreateProject />
    </ErrorBoundary>
);
