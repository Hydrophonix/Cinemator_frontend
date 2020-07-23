// Core
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary, DatePicker } from '../../components';

// Elements
import { Button } from '../../elements';

// Apollo hooks
import { useWorkdaysQuery, useUpdateWorkdayMutation } from '../../bus/Workday';

// Hooks
import { useForm } from '../../hooks';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Utils
import { transformDateToISO8601 } from '../../utils';

// Styles
import { UpdateWorkdayContainer, Header } from './styles';

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
    const [ updateWorkday ] = useUpdateWorkdayMutation({ projectId, setGlobalDateRangeRedux });
    const [ form, setForm, setInitialForm ] = useForm<typeof initialForm>(initialForm);
    const [ workdayDate, setWorkdayDate ] = useState<Date>(new Date());
    const workday = data?.workdays.find((workday) => workday.id === workdayId);

    useEffect(() => {
        if (workday) {
            setInitialForm({ description: workday.description || '' });
            setWorkdayDate(new Date(workday.date));
        }
    }, [ workday ]);

    if (loading || !data || !workday) {
        return <div>Loading...</div>;
    }

    const excludeDates = data.workdays.reduce<Date[]>((acc, mapWorkday) => {
        if (mapWorkday.date === workday.date) {
            return acc;
        }

        return [ ...acc, new Date(mapWorkday.date) ];
    }, []);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await updateWorkday({ variables: { input: {
            ...form,
            date: transformDateToISO8601(workdayDate),
        }, workdayId }});
        response && response.data && void push(`/${projectId}/calendar/${workdayId}`);
    };

    return (
        <UpdateWorkdayContainer>
            <Header>
                <Button
                    title = { `Back to ${workday.date}` }
                    onClick = { () => push(`/${projectId}/calendar/${workdayId}`) }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'reply'
                        style = {{ width: 16, height: 16 }}
                    />
                </Button>
                <h2>Update workday {workday.date}</h2>
                <div />
            </Header>
            <main>
                <nav>
                    <h2>Workday date:</h2>
                    <DatePicker
                        date = { workdayDate }
                        excludeDates = { excludeDates || [] }
                        onChange = { setWorkdayDate }
                    />
                    <h2>Workday description:</h2>
                    <textarea
                        name = 'description'
                        placeholder = 'Type here...'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button onClick = { onSubmit }>Update</Button>
                </nav>
            </main>
        </UpdateWorkdayContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateWorkday />
    </ErrorBoundary>
);
