// Core
import React, { FC, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Elements
import { Button } from '../../../../elements';

// Apollo hooks
import { useUpdateProjectMutation, useDeleteProjectMutation } from '../../../../bus/Project';

// Hooks
import { useForm } from '../../../../hooks';

// Styles
import { Header, Main, Footer } from './styles';
import { Section } from '../styles';

// Types
import { projectFields } from '../../../../bus/Project';

type PropTypes = projectFields & {
    setFlipped: Function
}

type Params = {
    projectId: string
};

const innitialForm = {
    title: '',
    // description: '',
};

export const ProjectSettings: FC<PropTypes> = (props) => {
    const { projectId } = useParams<Params>();
    const { push } = useHistory();
    const [ updateProject ] = useUpdateProjectMutation();
    const [ deleteProject ] = useDeleteProjectMutation({
        projectId,
        redirect: () => push('/'),
    });
    const [ form, setForm, setInitialForm ] = useForm<typeof innitialForm>(innitialForm);

    useEffect(() => {
        setInitialForm({
            title: props.title,
            // description: props.description || '',
        });
    }, []);

    const onSubmit = async () => {
        const response = await updateProject({ variables: { input: form, projectId }});
        response && response.data && void props.setFlipped();
    };

    const onDelete = async () => void await deleteProject();

    return (
        <Section>
            <Header>
                <h2>Settings</h2>
            </Header>
            <Main>
                <form>
                    <h2>Title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    {/* <h2>Description:</h2>
                    <input
                        name = 'description'
                        placeholder = 'Description'
                        value = { '' }
                        onChange = { setForm }
                    /> */}
                    <h2>Project locations:</h2>
                    <select>
                        <option>Kyiv</option>
                        <option>Lviv</option>
                        <option>Zaparizia</option>
                        <option>New york</option>
                    </select>
                </form>
            </Main>
            <Footer>
                <Button onClick = { onDelete }>Delete</Button>
                <Button onClick = { onSubmit }>Save</Button>
            </Footer>
        </Section>
    );
};
