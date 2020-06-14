// Core
import React, { FC } from 'react';
import {
    Switch,
    Route,
    Redirect,
    Link,
    useParams,
    useHistory,
} from 'react-router-dom';

// Containers
import { Scenes } from '../../containers/Scenes';
import { Requisite } from '../../containers/Requisite';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Assets
import { ProjectContainer } from './styles';

const Project: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <ProjectContainer>
            <aside>
                <Button onClick = { () => push('/') }>
                    Back
                </Button>
                <ul>
                    <li><Link to = { `/${projectId}/calendar` }>Calendar</Link></li>
                    <li><Link to = { `/${projectId}/scenes` }>Scenes</Link></li>
                    <li><Link to = { `/${projectId}/requisite` }>Requisite</Link></li>
                </ul>
            </aside>
            <Switch>
                <Route path = { '/:projectId/calendar' }>
                    Calendar
                </Route>
                <Route path = { '/:projectId/scenes' }>
                    <Scenes />
                </Route>
                <Route path = { '/:projectId/requisite' }>
                    <Requisite />
                </Route>
                <Redirect to = { '/:projectId/scenes' }/>
            </Switch>
        </ProjectContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Project />
    </ErrorBoundary>
);
