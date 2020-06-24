// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkDayContainer } from './styles';

// Types
type Params = {
    projectId?: string
    workDayDate?: string
}

type PropTypes = {}

const WorkDay: FC<PropTypes> = () => {
    const { goBack } = useHistory();
    const { projectId, workDayDate } = useParams<Params>();

    return (
        <WorkDayContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{workDayDate}</h2>
                <Button>Edit</Button>
            </header>
            <main>
                Some WorkDay data
            </main>
        </WorkDayContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <WorkDay />
    </ErrorBoundary>
);
