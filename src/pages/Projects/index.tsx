// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ProjectItem } from './ProjectItem';
import { ErrorBoundary } from '../../components';

// Elements
import { Button, Spinner } from '../../elements';

// Apollo
import { useOwnedProjectsQuery } from '../../bus/Project';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Styles
import { Container, Header } from './styles';

const Projects: FC = () => {
    const { push } = useHistory();
    const { data } = useOwnedProjectsQuery();
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    if (!data) {
        return <Spinner />;
    }

    return (
        <Container>
            <Header>
                <div />
                <h2>Projects</h2>
                <div style = {{ alignContent: 'flex-end' }}>
                    <Button
                        disabled = { !isOnline }
                        title = 'Create project'
                        onClick = { () => void push('/create-project') }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 50, height: 16 }}
                        />
                    </Button>
                </div>
            </Header>
            <main>
                {
                    data.ownedProjects.map((project) => (
                        <ProjectItem
                            key = { project.id }
                            { ...project }
                            projectRedirectHandler = { () => void push(`/${project.id}`) }
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
