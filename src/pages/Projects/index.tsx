// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { ProjectItem } from './ProjectItem';
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Hooks
import { useOwnedProjectsQuery } from '../../bus/Project';

// Assets
import { Container, Header } from './styles';

const Projects: FC = () => {
    const { push } = useHistory();
    const { data, loading } = useOwnedProjectsQuery();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const projectRedirectHandler = (projectId: string) => void push(`/${projectId}`);

    return (
        <Container>
            <Header>
                <div />
                <h2>Projects</h2>
                <div style = {{ alignContent: 'flex-end' }}>
                    <Button onClick = { () => void push('/create-project') }>
                        Create new project
                    </Button>
                </div>
            </Header>
            <main>
                {
                    data.ownedProjects.map((project) => (
                        <ProjectItem
                            key = { project.id }
                            { ...project }
                            projectRedirectHandler = { projectRedirectHandler }
                        />
                    ))
                }
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Projects />
    </ErrorBoundary>
);
