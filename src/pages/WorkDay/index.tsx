// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkdayContainer } from './styles';

// Types
type Params = {
    projectId?: string
    workDayDate?: string
}

type PropTypes = {}

const Workday: FC<PropTypes> = () => {
    const { goBack } = useHistory();
    const { projectId, workDayDate } = useParams<Params>();

    return (
        <WorkdayContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{workDayDate}</h2>
                <Button>Edit</Button>
            </header>
            <main>
                Some Workday data
            </main>
        </WorkdayContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
