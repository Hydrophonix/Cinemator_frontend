// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner } from '../../elements';

// Assets
import { Container, Header } from './styles';

// Hooks
import { useForm } from '../../hooks';
import { useCreateProjectMutation } from '../../bus/Project';

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

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createProject({ variables: { input: form }});
        response && response.data && void push(`/${response.data.createProject.id}`);
    };

    return (
        <Container>
            {createProjectLoading && <Spinner absolute />}
            <Header>
                <div>
                    <Button
                        title = 'Back to projects'
                        onClick = { () => void push('/') }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Create project</h2>
            </Header>
            <main>
                <div>
                    <h2>Project title:</h2>
                    <Input
                        name = 'title'
                        placeholder = 'Type here...'
                        onChange = { setForm }
                    />
                    <h2>Project description:</h2>
                    <textarea
                        name = 'description'
                        placeholder = 'Type here...'
                        onChange = { setForm }
                    />
                    <Button onClick = { onSubmit }>Create</Button>
                </div>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateProject />
    </ErrorBoundary>
);
