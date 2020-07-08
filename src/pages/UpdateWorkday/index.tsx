// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useWorkdaysQuery, useUpdateWorkdayMutation } from '../../bus/Workday';

// Styles
import { UpdateWorkdayContainer, Header } from './styles';

// Types
import { WorkdayUpdateInput } from '../../@types/graphql-global-types';

type Params = {
    projectId: string
    workdayId: string
}

const initialForm = {
    title: '',
};

const UpdateWorkday: FC = () => {
    const { goBack } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });
    const [ updateWorkday ] = useUpdateWorkdayMutation();
    const [ form, setForm, setInitialForm ] = useForm<WorkdayUpdateInput>(initialForm);
    const workday = data?.workdays.find((workday) => workday.id === workdayId);

    useEffect(() => {
        workday && void setInitialForm({ title: workday.title ?? '' });
    }, [ workday ]);

    if (loading || !data || !workday) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await updateWorkday({ variables: { input: form, workdayId }});
        response && response.data && void goBack();
    };

    return (
        <UpdateWorkdayContainer>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Update workday {workday.date}</h2>
                <div />
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Workday title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Workday title'
                        value = { form.title ?? '' }
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Update</Button>
                </form>
            </main>
        </UpdateWorkdayContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateWorkday />
    </ErrorBoundary>
);
