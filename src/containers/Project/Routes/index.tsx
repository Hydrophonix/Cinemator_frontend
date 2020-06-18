// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Scenes, Requisite } from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>
                <Route path = { '/:projectId/scenes/:id' }>
                    Scene ID
                </Route>
                <Route path = { '/:projectId/requisite/:id' }>
                    Requisite ID
                </Route>
                <Route path = { '/:projectId/calendar' }>
                    Calendar
                </Route>
                <Route path = { '/:projectId/scenes' }>
                    <Scenes />
                </Route>
                <Route path = { '/:projectId/requisite' }>
                    <Requisite />
                </Route>

                <Redirect to = { '/:projectId/scenes' } />
            </Switch>
        </Suspense>
    );
};
