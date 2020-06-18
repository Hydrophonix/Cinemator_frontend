// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Containers
import { Project } from '../../Project';

// Pages
import { Projects } from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>
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
