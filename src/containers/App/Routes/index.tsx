// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Containers
import { Project } from '../../Project';

// Pages
import { Projects, CreateProject, Login, Register } from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>
                <Route
                    exact
                    path = '/login'>
                    <Login />
                </Route>
                <Route
                    exact
                    path = '/register'>
                    <Register />
                </Route>
                <Route
                    exact
                    path = '/create-project'>
                    <CreateProject />
                </Route>
                <Route path = '/:projectId'>
                    <Project />
                </Route>
                <Route path = '/'>
                    <Projects />
                </Route>
            </Switch>
        </Suspense>
    );
};
