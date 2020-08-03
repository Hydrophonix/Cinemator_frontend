// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary, DatePicker } from '../../components';

// Elements
import { Button, Spinner, Textarea } from '../../elements';

// Apollo hooks
import { useCreateWorkdayMutation, useWorkdaysQuery } from '../../bus/Workday';

// Hooks
import { useForm } from '../../hooks';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { Container, Header, CreateInputs } from './styles';

const innitialForm = {
    description: '',
};

export type Params = {
    projectId: string
    date: string
}

const CreateWorkday: FC = () => {
    const { push } = useHistory();
    const { projectId, date } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });
    const [ form, setForm ] = useForm<typeof innitialForm>(innitialForm);
    const { setGlobalDateRangeRedux } = useInputsRedux();
    const [ createWorkday, { loading: createWorkdayLoading }] = useCreateWorkdayMutation({
        projectId, setGlobalDateRangeRedux,
    });
    const isTableMode = date === 'new-date';
    const [ defaultDate, setDefaultDate ] = useState<Date>(isTableMode ? new Date() : new Date(date));

    if (loading || !data) {
        return <Spinner />;
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const response = await createWorkday({
            variables: {
                input: {
                    date:        transformDateToISO8601(new Date(defaultDate)),
                    description: form.description,
                },
                projectId,
            },
        });

        response && response.data && void push(`/${projectId}/calendar/${response.data.createWorkday.id}`);
    };

    const excludeDates = data.workdays.map((workday) => new Date(workday.date));
    const isTodayWorkday = excludeDates.some((date) => {
        return transformDateToISO8601(defaultDate) === transformDateToISO8601(date);
    });

    return (
        <Container>
            {createWorkdayLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = 'Back to calendar'
                        onClick = { () => push(`/${projectId}/calendar`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Create workday{ !isTableMode && ` ${date}`}</h2>
            </Header>
            <CreateInputs>
                <section>
                    <h2>Workday date:</h2>
                    <DatePicker
                        date = { isTableMode ? defaultDate : new Date(date) }
                        disabled = { !isTableMode }
                        excludeDates = { excludeDates }
                        onChange = { setDefaultDate }
                    />
                    <h2>Workday description:</h2>
                    <Textarea
                        name = 'description'
                        placeholder = 'Type here...'
                        value = { form.description }
                        onChange = { setForm }
                    />
                    <Button
                        disabled = { isTableMode ? isTodayWorkday : false }
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
        <CreateWorkday />
    </ErrorBoundary>
);
