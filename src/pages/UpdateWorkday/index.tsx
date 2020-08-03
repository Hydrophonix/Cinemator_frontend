// Core
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary, DatePicker } from '../../components';

// Elements
import { Button, Spinner, Textarea } from '../../elements';

// Apollo hooks
import { useWorkdaysQuery, useUpdateWorkdayMutation, useDeleteWorkdayMutation } from '../../bus/Workday';

// Hooks
import { useForm } from '../../hooks';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { Container, Header, UpdateInputs } from './styles';

type Params = {
    projectId: string
    workdayId: string
}

const initialForm = {
    description: '',
};

const UpdateWorkday: FC = () => {
    const { push } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });
    const { setGlobalDateRangeRedux } = useInputsRedux();
    const [ updateWorkday, { loading: updateWorkdayLoading }] = useUpdateWorkdayMutation({
        projectId, setGlobalDateRangeRedux,
    });
    const [ deleteWorkday, { loading: deleteWorkdayLoading }] = useDeleteWorkdayMutation({
        projectId, workdayId, setGlobalDateRangeRedux,
    });
    const [ form, setForm, setInitialForm ] = useForm<typeof initialForm>(initialForm);
    const [ workdayDate, setWorkdayDate ] = useState<Date>(new Date());
    const workday = data?.workdays.find((workday) => workday.id === workdayId);
    const isSpinnerActive = updateWorkdayLoading || deleteWorkdayLoading;

    useEffect(() => {
        if (workday) {
            setInitialForm({ description: workday.description || '' });
            setWorkdayDate(new Date(workday.date));
        }
    }, [ workday ]);

    if (loading || !data) {
        return <Spinner />;
    }

    if (!workday) {
        push(`/${projectId}/calendar`);

        return null;
    }

    const excludeDates = data.workdays.reduce<Date[]>((acc, mapWorkday) => {
        if (mapWorkday.date === workday.date) {
            return acc;
        }

        return [ ...acc, new Date(mapWorkday.date) ];
    }, []);

    const onSubmit = async () => {
        const response = await updateWorkday({ variables: { input: {
            ...form,
            date: transformDateToISO8601(workdayDate),
        }, workdayId }});
        response && response.data && void push(`/${projectId}/calendar/${workdayId}`);
    };

    const deleteWorkdayHandler = async () => {
        const isContinue = window.confirm(`Confirm delete workday: ${workday.date}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteWorkday();
        response && response.data && void push(`/${projectId}/calendar`);
    };

    return (
        <Container>
            {isSpinnerActive && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = { `Back to ${workday.date}` }
                        onClick = { () => push(`/${projectId}/calendar/${workdayId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Update W:{workday.date}</h2>
                <nav>
                    <Button
                        title = 'Delete'
                        onClick = { deleteWorkdayHandler }>
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
                    <h2>Workday date:</h2>
                    <DatePicker
                        date = { workdayDate }
                        excludeDates = { excludeDates || [] }
                        onChange = { setWorkdayDate }
                    />
                    <h2>Workday description:</h2>
                    <Textarea
                        name = 'description'
                        placeholder = 'Description...'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button
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
        <UpdateWorkday />
    </ErrorBoundary>
);
