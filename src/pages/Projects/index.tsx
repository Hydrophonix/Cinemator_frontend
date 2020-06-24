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

// Mock
const projects = [
    {
        id:           'matrixCinemaId132',
        ownerId:      '1o',
        projectName:  'Matrix',
        requisiteIds: [ '1r' ],
        memberIds:    [ '1m' ],
        startDate:    Date.now(),
        endDate:      Date.now() + (1000 * 60 * 60 * 24 * 7),
        workDaysIds:  [ '1w' ],
    },
    {
        id:           'PiratesCinemaId132',
        ownerId:      '1oasdf',
        projectName:  'Pirates',
        requisiteIds: [ '1sdf' ],
        memberIds:    [ '1sdfm' ],
        startDate:    Date.now(),
        endDate:      Date.now() + (1000 * 60 * 60 * 24 * 7),
        workDaysIds:  [ '1wsdf' ],
    },
];

const Projects: FC = () => {
    const { push } = useHistory();
    const { data, loading } = useOwnedProjectsQuery();
    console.log('Projects:FC -> loading', loading);
    console.log('Projects:FC -> data', data);

    const projectRedirectHandler = (projectId: string) => push(`/${projectId}`);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <ProjectsContainer>
            <nav>
                <Button onClick = { () => push('/create-project') }>
                    +
                </Button>
            </nav>
            <main>
                {
                    data && data.ownedProjects.map((project) => (
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
