// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useRequisitesQuery, useDeleteRequisiteMutation } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { RequisiteContainer } from './styles';

// Types
type Params = {
    projectId: string
    requisiteId: string
}

const Requisite: FC = () => {
    const { goBack, push } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, requisiteId } = useParams<Params>();

    const { data, loading } = useRequisitesQuery({ variables: { projectId }});
    const [ deleteRequisite ] = useDeleteRequisiteMutation();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const requisite = data.requisites.find((requisite) => requisite.id === requisiteId);

    if (!requisite) {
        return <div>No requisite exist</div>;
    }

    const deleteRequisiteHandler = async () => {
        const response = await deleteRequisite({ variables: { id: requisite.id }});

        if (response && response.data) {
            push(`/${projectId}/requisites`);
        }
    };

    return (
        <RequisiteContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{requisite.title}</h2>
                <div>
                    <Button onClick = { () => setIsEdit(!isEdit) }>Edit</Button>
                    <Button onClick = { deleteRequisiteHandler }>Delete</Button>
                </div>
            </header>
            <main>
                Some requisite data
            </main>
        </RequisiteContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Requisite />
    </ErrorBoundary>
);
