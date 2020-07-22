// Core
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Input } from '../../elements';

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
    // number:      0,
    title:       '',
    description: '',
};

const UpdateRequisite: FC = () => {
    const { push } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateRequisite ] = useUpdateRequisiteMutation();
    const [ form, setForm, setInitialForm ] = useForm<RequisiteUpdateInput>(initialForm);
    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);

    useEffect(() => {
        requisite && void setInitialForm({
            // number:      requisite.number,
            title:       requisite.title,
            description: requisite.description ?? '',
        });
    }, [ requisite ]);

    if (loading || !data || !requisite) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await updateRequisite({ variables: { input: form, requisiteId }});
        response && response.data && void push(`/${projectId}/requisites/${requisiteId}`);
    };

    return (
        <Container>
            <Header>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/requisites/${requisiteId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Update requisite: {requisite.number}</h2>
            </Header>
            <main>
                <div>
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
                    <textarea
                        name = 'description'
                        placeholder = 'Description'
                        value = { form.description ?? '' }
                        onChange = { setForm }
                    />
                    <Button onClick = { onSubmit }>Update</Button>
                </div>
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <UpdateRequisite />
    </ErrorBoundary>
);
