// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useCreateRequisiteMutation } from '../../bus/Requisite';

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
    isOrdered:   false,
    pricePerDay: 0,
};

const CreateRequisite: FC = () => {
    const { goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createRequisite ] = useCreateRequisiteMutation({ projectId });
    const [ form, setForm ] = useForm<RequisiteCreateInput>(innitialForm);

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
                        value = { form.description ?? '' }
                        onChange = { setForm }
                    />
                    <h2>Requisite pricePerDay:</h2>
                    <input
                        name = 'pricePerDay'
                        placeholder = 'Requisite pricePerDay'
                        type = 'number'
                        value = { form.pricePerDay ?? '' }
                        onChange = { (event) => setForm(event, true) }
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
