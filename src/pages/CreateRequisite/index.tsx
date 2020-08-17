// Core
import React, { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Textarea } from '../../elements';

// Apollo
import { useRequisitesQuery, useCreateRequisiteMutation } from '../../bus/Requisite';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useForm } from '../../hooks';

// Styles
import { Container, Header, CreateInputs } from './styles';

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
    const { togglersRedux: { isOnline }} = useTogglersRedux();

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
        <Container>
            {createRequisiteLoading && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = 'Back to requisites'
                        onClick = { () => push(`/${projectId}/requisites`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Create requisite</h2>
            </Header>
            <CreateInputs>
                <section>
                    <h2>Requisite number:</h2>
                    <Input
                        name = 'number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => setForm(event, true) }
                    />
                    <h2>Requisite title:</h2>
                    <Input
                        name = 'title'
                        placeholder = 'Title'
                        value = { form.title }
                        onChange = { setForm }
                    />
                    <h2>Requisite description:</h2>
                    <Textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description || '' }
                        onChange = { setForm }
                    />
                    <Button
                        disabled = { !isOnline || form.title === '' }
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
        <CreateRequisite />
    </ErrorBoundary>
);
