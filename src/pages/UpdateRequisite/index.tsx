// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input, Spinner, Textarea } from '../../elements';

// Hooks
import { useForm } from '../../hooks';
import { useRequisitesQuery, useUpdateRequisiteMutation, useDeleteRequisiteMutation } from '../../bus/Requisite';

// Styles
import { Container, Header, UpdateInputs } from './styles';

// Types
import { RequisiteUpdateInput } from '../../@types/graphql-global-types';

type Params = {
    projectId: string
    requisiteId: string
}

const initialForm = {
    // number:      0,
    title:       '',
    description: '',
};

const UpdateRequisite: FC = () => {
    const { push } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateRequisite, { loading: updateRequisiteLoading }] = useUpdateRequisiteMutation();
    const [ deleteRequisite, { loading: deleteRequisiteLoading }] = useDeleteRequisiteMutation({
        projectId, requisiteId,
    });
    const [ form, setForm, setInitialForm ] = useForm<RequisiteUpdateInput>(initialForm);
    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);
    const isSpinnerActive = updateRequisiteLoading || deleteRequisiteLoading;

    useEffect(() => {
        requisite && void setInitialForm({
            // number:      requisite.number, // TODO: нужно ли здесь обновление номера?
            title:       requisite.title,
            description: requisite.description ?? '',
        });
    }, [ requisite ]);

    if (loading || !data) {
        return <Spinner />;
    }

    if (!requisite) {
        push(`/${projectId}/requisites`);

        return null;
    }

    const onSubmit = async () => {
        const response = await updateRequisite({ variables: { input: form, requisiteId }});
        response && response.data && void push(`/${projectId}/requisites/${requisiteId}`);
    };

    const deleteRequisiteHandler = async () => {
        const isContinue = window.confirm(`Confirm delete requisite: ${requisite.number}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteRequisite();
        response && response.data && void push(`/${projectId}/requisites`);
    };

    return (
        <Container>
            {isSpinnerActive && <Spinner absolute />}
            <Header>
                <nav>
                    <Button
                        title = { `Back to R:${requisite.number}` }
                        onClick = { () => void push(`/${projectId}/requisites/${requisiteId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>Update R:{requisite.number}</h2>
                <nav>
                    <Button
                        title = 'Delete'
                        onClick = { deleteRequisiteHandler }>
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
                    {/* <h2>Requisite number:</h2>
                    <Input
                        name = 'number'
                        placeholder = 'Number'
                        type = 'number'
                        value = { form.number ?? 0 }
                        onChange = { (event) => void setForm(event, true) }
                    /> */}
                    <h2>Requisite title:</h2>
                    <Input
                        name = 'title'
                        placeholder = 'Title'
                        value = { form.title ?? '' }
                        onChange = { setForm }
                    />
                    <h2>Requisite description:</h2>
                    <Textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description ?? '' }
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
        <UpdateRequisite />
    </ErrorBoundary>
);
