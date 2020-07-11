// Core
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { Sidebar } from './Sidebar';

// Routes
import { Routes } from './Routes';

// Elements
import { Button } from '../../elements';

// Apollo hooks
import { useOwnedProjectsQuery } from '../../bus/Project';

// Styles
import { Container, Header } from './styles';

type Params = {
    projectId: string
}

export const Project: FC = () => {
    const { push } = useHistory();
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
            <Header>
                <nav>
                    <Button onClick = { () => void push('/') }>To projects</Button>
                </nav>
                <h2>{project.title}</h2>
                <nav style = {{ justifyContent: 'flex-end' }}>
                    <Button>Update</Button>
                </nav>
            </Header>
            <main>
                <Sidebar />
                <Routes />
            </main>
        </Container>
    );
};
