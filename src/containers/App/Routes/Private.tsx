// Core
import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Containers
import { Project } from '../../Project';

// Pages
import { Projects, CreateProject } from '../../../pages';

export const Private: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path = '/create-project'>
                <CreateProject />
            </Route>
            <Route
                path = '/:projectId'>
                <Project />
            </Route>
            <Route
                exact
                path = '/'>
                <Projects />
            </Route>
            <Redirect to = '/' />
        </Switch>
    );
};
