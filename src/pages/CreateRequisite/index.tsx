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
import { CreateRequisiteContainer } from './styles';

const innitialForm = {
    title:       '',
    description: '',
    pricePerDay: 0,
};

export type Params = {
    projectId: string
}

const CreateRequisite: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createRequisite ] = useCreateRequisiteMutation({ projectId });
    const [ form, setForm ] = useForm(innitialForm);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const response = await createRequisite({
            variables: {
                input: {
                    title:       form.title,
                    description: form.description,
                    isOrdered:   false,
                    pricePerDay: form.pricePerDay,
                },
                projectId,
            },
        });

        if (response && response.data) {
            push(`/${projectId}/requisites`);
        }
    };

    return (
        <CreateRequisiteContainer>
            <nav>
                <Button onClick = { () => goBack() }>
                    Back
                </Button>
            </nav>
            <main>
                <form onSubmit = { (event) => onSubmit(event) }>
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
                        value = { form.description }
                        onChange = { setForm }
                    />
                    <h2>Requisite pricePerDay:</h2>
                    <input
                        name = 'pricePerDay'
                        placeholder = 'Requisite pricePerDay'
                        type = 'number'
                        value = { form.pricePerDay }
                        onChange = { (event) => setForm(event, true) }
                    />

                    <button type = 'submit'>Submit</button>
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
