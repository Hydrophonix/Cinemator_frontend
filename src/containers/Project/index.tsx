// Core
import React, { FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Components
import { Sidebar } from './Sidebar';

// Elements
import { Spinner } from '../../elements';

// Routes
import { Routes } from './Routes';

// Apollo hooks
import { useOwnedProjectsQuery } from '../../bus/Project';

// Styles
import { Container } from './styles';

type Params = {
    projectId: string
}

export const Project: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data, loading } = useOwnedProjectsQuery();

    if (loading || !data) {
        return <Spinner />;
    }

    const project = data.ownedProjects.find((project) => project.id === projectId);

    if (!project) {
        push('/');

        return null;
    }

    return (
        <Container>
            <Sidebar { ...project }/>
            <Routes />
        </Container>
    );
};
