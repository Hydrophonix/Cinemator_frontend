// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Sidebar } from './Sidebar';

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
    const { projectId } = useParams<Params>();
    const { data, loading } = useOwnedProjectsQuery();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const project = data.ownedProjects.find((project) => project.id === projectId);

    if (!project) {
        return <div>Project do not exist!</div>;
    }

    return (
        <Container>
            <Sidebar { ...project }/>
            <Routes />
        </Container>
    );
};
