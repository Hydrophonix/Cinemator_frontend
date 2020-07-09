// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useRequisitesQuery, useDeleteRequisiteMutation } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { RequisiteContainer, RequisiteHeader } from './styles';

// Types
type Params = {
    projectId: string
    requisiteId: string
}

const Requisite: FC = () => {
    const { goBack, push } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ deleteRequisite ] = useDeleteRequisiteMutation({ projectId, requisiteId });

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const requisite = data.requisites.find((requisite) => requisite.id === requisiteId);

    if (!requisite) {
        return <div>No requisite exist</div>;
    }

    const deleteRequisiteHandler = async () => {
        const response = await deleteRequisite();
        response && response.data && void push(`/${projectId}/requisites`);
    };

    return (
        <RequisiteContainer>
            <RequisiteHeader>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/requisites`) }>To requisites</Button>
                    <Button onClick = { goBack }>Go back</Button>
                </div>
                <h2>Requisite: {1}</h2>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/update-requisite/${requisiteId}`) }>
                        Update
                    </Button>
                    <Button onClick = { deleteRequisiteHandler }>Delete</Button>
                </div>
            </RequisiteHeader>
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
