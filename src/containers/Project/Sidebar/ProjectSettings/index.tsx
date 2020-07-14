// Core
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Elements
import { Button } from '../../../../elements';

// Apollo hooks
import { useUpdateProjectMutation } from '../../../../bus/Project';

// Hooks
import { useForm } from '../../../../hooks';

// Styles
import { Header, Main, Footer } from './styles';
import { Section } from '../styles';

// Utils
import { transformDateToISO8601 } from '../../../../utils';

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
    const [ updateProject ] = useUpdateProjectMutation();
    const [ form, setForm, setInitialForm ] = useForm<typeof innitialForm>(innitialForm);
    const [ startDay, setStartDay ] = useState(new Date());
    const [ endDay, setEndDay ] = useState(new Date());

    useEffect(() => {
        setInitialForm({
            title: props.title,
            // description: props.description || '',
        });
        setStartDay(new Date(props.startDay));
        setEndDay(new Date(props.endDay));
    }, []);

    const onSubmit = async () => {
        const response = await updateProject({
            variables: {
                input: {
                    ...form,
                    startDay: transformDateToISO8601(startDay),
                    endDay:   transformDateToISO8601(endDay),
                },
                projectId,
            },
        });

        response && response.data && void props.setFlipped();
    };

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
                    <h2>Project start:</h2>
                    <DatePicker
                        selectsStart
                        endDate = { endDay }
                        popperPlacement = 'top-center'
                        selected = { startDay }
                        startDate = { startDay }
                        onChange = { (date) => date && void setStartDay(date) }
                    />
                    <h2>Project end:</h2>
                    <DatePicker
                        selectsEnd
                        endDate = { endDay }
                        minDate = { startDay }
                        popperPlacement = 'top-center'
                        selected = { endDay }
                        startDate = { startDay }
                        onChange = { (date) => date && void setEndDay(date) }
                    />
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
                <Button onClick = { onSubmit }>Save</Button>
            </Footer>
        </Section>
    );
};
