// Core
import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner } from '../../elements';

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
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ createRequisite, { loading: createRequisiteLoading }] = useCreateRequisiteMutation({ projectId });
    const [ form, setForm, setInitialForm ] = useForm<RequisiteCreateInput>(innitialForm);

    useEffect(() => {
        data && void setInitialForm({ title: '', description: '', number: 0 });
    }, [ data ]);

    if (loading || !data) {
        return <Spinner />;
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createRequisite({ variables: { input: form, projectId }});
        response && response.data && void push(`/${projectId}/requisites/${response.data.createRequisite.id}`);
    };

    return (
        <CreateRequisiteContainer>
            {createRequisiteLoading && <Spinner absolute />}
            <Header>
                <div>
                    <Button
                        title = 'Back to requisites'
                        onClick = { () => push(`/${projectId}/requisites`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Create requisite</h2>
            </Header>
            <main>
                <div>
                    <h2>Requisite number:</h2>
                    <Input
                        name = 'number'
                        placeholder = 'Requisite number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => setForm(event, true) }
                    />
                    <h2>Requisite title:</h2>
                    <Input
                        name = 'title'
                        placeholder = 'Requisite title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    <h2>Requisite description:</h2>
                    <textarea
                        name = 'description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button
                        disabled = { form.title === '' }
                        onClick = { onSubmit }>
                        Create
                    </Button>
                </div>
            </main>
        </CreateRequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateRequisite />
    </ErrorBoundary>
);
