// Core
import React, { FC, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Elements
import { Button } from '../../../../elements';

// Apollo hooks
import { useUpdateProjectMutation, useDeleteProjectMutation } from '../../../../bus/Project';

// Hooks
import { useForm, useLocalStorage } from '../../../../hooks';

// Redux
import { useUiRedux } from '../../../../@init/redux/ui';

// Styles
import { Header, Main, Footer, WorkdaysSettings } from './styles';
import { Section } from '../styles';

// Types
import { projectFields } from '../../../../bus/Project';
import { ProjectUpdateInput } from '../../../../@types/graphql-global-types';

type PropTypes = projectFields & {
    setFlipped: Function
}

type Params = {
    projectId: string
};

const innitialForm = {
    title:       '',
    description: '',
};

// Instruments
const activeStyles = { backgroundColor: '#2d6a4f', color: '#fff' };

export const ProjectSettings: FC<PropTypes> = (props) => {
    const { projectId } = useParams<Params>();
    const { push } = useHistory();
    const { ui, setCalendarView } = useUiRedux();
    const [ _, setToLocalStorage ] = useLocalStorage('isCalendarView', true); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [ updateProject ] = useUpdateProjectMutation();
    const [ deleteProject ] = useDeleteProjectMutation({ projectId, redirect: () => push('/') });

    const [ form, setForm, setInitialForm ] = useForm<ProjectUpdateInput>(innitialForm);

    useEffect(() => {
        setInitialForm({
            title:       props.title || '',
            description: props.description || '',
        });
    }, []);

    const onSubmit = async () => {
        if (props.title === form.title && props.description === form.description) {
            props.setFlipped();

            return;
        }

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
                <h2>Title:</h2>
                <input
                    name = 'title'
                    placeholder = 'Title'
                    value = { form.title || '' }
                    onChange = { setForm }
                />
                <h2>Description:</h2>
                <input
                    name = 'description'
                    placeholder = 'Description'
                    value = { form.description || '' }
                    onChange = { setForm }
                />
                <h2>Project locations:</h2>
                <select>
                    <option>Kyiv</option>
                    <option>Lviv</option>
                    <option>Zaparizia</option>
                    <option>New york</option>
                </select>
                <h2>Calendar view:</h2>
                <WorkdaysSettings>
                    <Button
                        style = { ui.isCalendarView ? activeStyles : {} }
                        onClick = { () => {
                            setCalendarView(true);
                            setToLocalStorage(true);
                        } }>
                        Calendar
                    </Button>
                    <Button
                        style = { !ui.isCalendarView ? activeStyles : {} }
                        onClick = { () => {
                            setCalendarView(false);
                            setToLocalStorage(false);
                        } }>
                        Table
                    </Button>
                </WorkdaysSettings>
            </Main>
            <Footer>
                <Button onClick = { onDelete }>
                    Delete
                </Button>
                <Button onClick = { onSubmit }>
                    Save
                </Button>
            </Footer>
        </Section>
    );
};
