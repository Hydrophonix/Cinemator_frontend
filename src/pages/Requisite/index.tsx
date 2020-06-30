// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useRequisiteQuery, useDeleteRequisiteMutation } from '../../bus/Requisite';

// Elements
import { Button } from '../../elements';

// Styles
import { RequisiteContainer } from './styles';

// Types
type Params = {
    projectId: string
    requisiteId: string
}

type PropTypes = {
    requisiteName?: string
}

const Requisite: FC<PropTypes> = ({ requisiteName }) => {
    const { goBack, push } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, requisiteId } = useParams<Params>();

    const { data, loading } = useRequisiteQuery({ variables: { id: requisiteId }});
    const [ deleteRequisite ] = useDeleteRequisiteMutation();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const deleteRequisiteHandler = async () => {
        const response = await deleteRequisite({ variables: { id: data.requisite.id }});

        if (response && response.data) {
            push(`/${projectId}/requisites`);
        }
    };

    return (
        <RequisiteContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{requisiteName || 'TEST NAME'}</h2>
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
