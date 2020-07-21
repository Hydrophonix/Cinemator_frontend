// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

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
    const { goBack } = useHistory();
    const [ createProject ] = useCreateProjectMutation();
    const [ form, setForm ] = useForm<ProjectCreateInput>(innitialForm);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await createProject({ variables: { input: form }});

        response && response.data && void goBack();
    };

    return (
        <Container>
            <Header>
                <div>
                    <Button onClick = { goBack }>Back</Button>
                </div>
                <h2>Create project</h2>
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Project title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Project title'
                        onChange = { setForm }
                    />
                    <h2>Project description:</h2>
                    <input
                        name = 'description'
                        placeholder = 'Project description'
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Submit</Button>
                </form>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateProject />
    </ErrorBoundary>
);
