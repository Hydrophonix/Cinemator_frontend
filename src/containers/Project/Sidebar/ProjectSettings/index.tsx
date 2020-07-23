// Core
import React, { FC, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button, Input } from '../../../../elements';

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

    const onDelete = async () => {
        const isContinue = window.confirm(`Confirm delete project: ${props.title}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        await deleteProject();
    };

    return (
        <Section>
            <Header>
                <h2>Settings</h2>
            </Header>
            <Main>
                <h2>Title:</h2>
                <Input
                    name = 'title'
                    placeholder = 'Title'
                    value = { form.title || '' }
                    onChange = { setForm }
                />
                <h2>Description:</h2>
                <textarea
                    name = 'description'
                    placeholder = 'Description'
                    value = { form.description || '' }
                    onChange = { setForm }
                />
                <h2>Calendar view:</h2>
                <WorkdaysSettings>
                    <Button
                        style = { ui.isCalendarView ? activeStyles : {} }
                        onClick = { () => {
                            setCalendarView(true);
                            setToLocalStorage(true);
                        } }>
                        <FontAwesomeIcon
                            color = { !ui.isCalendarView ? '#000' : '#fff' }
                            icon = 'calendar-alt'
                            style = {{ width: 26, height: 26 }}
                        />
                    </Button>
                    <Button
                        style = { !ui.isCalendarView ? activeStyles : {} }
                        onClick = { () => {
                            setCalendarView(false);
                            setToLocalStorage(false);
                        } }>
                        <FontAwesomeIcon
                            color = { ui.isCalendarView ? '#000' : '#fff' }
                            icon = 'table'
                            style = {{ width: 26, height: 26 }}
                        />
                    </Button>
                </WorkdaysSettings>
            </Main>
            <Footer>
                <Button onClick = { onDelete }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'trash-alt'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
                <Button onClick = { onSubmit }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'save'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Section>
    );
};
