// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useRequisitesQuery, useUpdateRequisiteMutation } from '../../bus/Requisite';

// Styles
import { Container, Header } from './styles';

// Types
import { RequisiteUpdateInput } from '../../@types/graphql-global-types';

type Params = {
    projectId: string
    requisiteId: string
}

const initialForm = {
    title:       '',
    description: '',
};

const UpdateRequisite: FC = () => {
    const { goBack } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateRequisite ] = useUpdateRequisiteMutation();
    const [ form, setForm, setInitialForm ] = useForm<RequisiteUpdateInput>(initialForm);
    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);

    useEffect(() => {
        requisite && void setInitialForm({
            title:       requisite.title,
            description: requisite.description ?? '',
        });
    }, [ requisite ]);

    if (loading || !data || !requisite) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await updateRequisite({ variables: { input: form, requisiteId }});
        response && response.data && void goBack();
    };

    return (
        <Container>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Update requisite: {1}</h2>
                <div />
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Title'
                        value = { form.title ?? '' }
                        onChange = { setForm }
                    />
                    <h2>Description:</h2>
                    <input
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description ?? '' }
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Update</Button>
                </form>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateRequisite />
    </ErrorBoundary>
);
