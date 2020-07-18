// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, RequisitesTable } from '../../components';

// Elemets
import { Button } from '../../elements';

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
    const { inputs: { requisitesInputs }, setIndexRedux, setRequisiteTitleRedux } = useInputsRedux();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const findByIndex = () => {
        // const requisite = data.requisites.find((requisite) => requisite.requisiteNumber === index);

        // if (requisite) {
        //     return [requisite];
        // }

        return data.requisites;
    };

    const findByString = () => data.requisites.filter((requisite) => {
        return requisite.title.toLocaleLowerCase().includes(requisitesInputs.title.toLocaleLowerCase());
    });

    const filterHandler = () => {
        if (requisitesInputs.index !== 0) {
            return findByIndex();
        }

        if (requisitesInputs.title !== '') {
            return findByString();
        }

        return data.requisites;
    };

    return (
        <RequisiteContainer>
            <Header>
                <div />
                <h2>Requisites</h2>
                <Button onClick = { () => void push(`/${projectId}/create-requisite`) }>
                    Add new requisite
                </Button>
            </Header>
            <div style = {{ overflowX: 'hidden', overflowY: 'scroll' }}>
                <RequisitesTable
                    index = { requisitesInputs.index }
                    requisites = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexRedux({
                        inputType: 'requisitesInputs',
                        index:     newIndex,
                    }) }
                    setTitle = { (newTitle: string) => setRequisiteTitleRedux(newTitle) }
                    title = { requisitesInputs.title }
                />
            </div>
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisites />
    </ErrorBoundary>
);
