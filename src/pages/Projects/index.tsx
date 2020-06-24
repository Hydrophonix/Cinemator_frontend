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
import { ProjectsContainer } from './styles';

const Projects: FC = () => {
    const { push } = useHistory();
    const { data, loading } = useOwnedProjectsQuery();

    const projectRedirectHandler = (projectId: string) => push(`/${projectId}`);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <ProjectsContainer>
            <nav>
                <Button onClick = { () => push('/create-project') }>
                    Create new project
                </Button>
            </nav>
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
        </ProjectsContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Projects />
    </ErrorBoundary>
);
