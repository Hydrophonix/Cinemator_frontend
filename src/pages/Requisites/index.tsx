// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, DatePicker, RequisitesTable } from '../../components';

// Styles
import { RequisiteContainer, Header } from './styles';

// Types
type Params = {
    projectId: string
}

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useRequisitesQuery({ projectId });
    const { inputs: { requisitesInputs }, setDateRange } = useReduxInputs();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <RequisiteContainer>
            <Header>
                <DatePicker
                    reset
                    endDay = { requisitesInputs.dateRange.endDay }
                    inputType = 'requisitesInputs'
                    projectId = { projectId }
                    setDateRange = { setDateRange }
                    startDay = { requisitesInputs.dateRange.startDay }
                />
                <h2>Requisites</h2>
                <button onClick = { () => void push(`/${projectId}/create-requisite`) }>Add new requisite</button>
            </Header>
            <RequisitesTable requisites = { data.requisites }/>
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisites />
    </ErrorBoundary>
);
