// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const { push } = useHistory();
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
                    <Button onClick = { () => void push(`/${projectId}/requisites`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16, marginRight: 5 }}
                        />
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'utensils'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>R: {requisite.number}</h2>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/update-requisite/${requisiteId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button onClick = { deleteRequisiteHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
            </RequisiteHeader>
            <main>
                <h2>Description</h2>
                <p>{requisite.description}</p>
            </main>
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisite />
    </ErrorBoundary>
);
