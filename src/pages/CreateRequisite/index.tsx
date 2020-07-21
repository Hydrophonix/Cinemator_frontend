// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Apollo hooks
import { useRequisitesQuery, useCreateRequisiteMutation } from '../../bus/Requisite';

// Hooks
import { useForm } from '../../hooks';

// Styles
import { CreateRequisiteContainer, Header } from './styles';

// Types
import { RequisiteCreateInput } from '../../@types/graphql-global-types';

export type Params = {
    projectId: string
}

const innitialForm = {
    title:       '',
    description: '',
    number:      0,
};

const CreateRequisite: FC = () => {
    const { goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ createRequisite ] = useCreateRequisiteMutation({ projectId });
    const [ form, setForm, setInitialForm ] = useForm<RequisiteCreateInput>(innitialForm);

    useEffect(() => {
        if (data) {
            const newRequisiteNumber = (data.requisites.map((requisite) => requisite.number)
                .sort((a, b) => a < b ? 1 : -1)[ 0 ] || 0) + 1;

            setInitialForm({
                title:       '',
                description: '',
                number:      newRequisiteNumber,
            });
        }
    }, [ data ]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await createRequisite({ variables: { input: form, projectId }});
        response && response.data && void goBack();
    };

    return (
        <CreateRequisiteContainer>
            <Header>
                <Button onClick = { goBack }>Back</Button>
                <h2>Create requisite</h2>
                <div />
            </Header>
            <main>
                <form onSubmit = { onSubmit }>
                    <h2>Requisite number:</h2>
                    <input
                        disabled
                        name = 'number'
                        placeholder = 'Requisite number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => setForm(event, true) }
                    />
                    <h2>Requisite title:</h2>
                    <input
                        name = 'title'
                        placeholder = 'Requisite title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    <h2>Requisite description:</h2>
                    <input
                        name = 'description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button type = 'submit'>Submit</Button>
                </form>
            </main>
        </CreateRequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateRequisite />
    </ErrorBoundary>
);
