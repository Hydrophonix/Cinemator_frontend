// Core
import React, { FC, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';

// Containers
import { Project } from '../../Project';

// Pages
import { Projects, CreateProject, Profile } from '../../../pages';

export const Private: FC = () => {
    const { push } = useHistory();
    const { pathname } = useLocation();

    useEffect(()=> {
        if (pathname.match(/login|register/)) {
            push('/');
        }
    });

    return (
        <Switch>
            <Route
                exact
                path = '/profile'>
                <Profile />
            </Route>
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
