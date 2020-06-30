// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { RequisiteContainer } from './styles';

// Types
type Params = {
    projectId?: string
    requisiteId?: string
}

type PropTypes = {
    requisiteName?: string
}

const Requisite: FC<PropTypes> = ({ requisiteName }) => {
    const { goBack } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    console.log('"|_(ʘ_ʘ)_/" =>: requisiteId', requisiteId);
    console.log('"|_(ʘ_ʘ)_/" =>: projectId', projectId);

    return (
        <RequisiteContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{requisiteName || 'TEST NAME'}</h2>
                <Button>Edit</Button>
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
