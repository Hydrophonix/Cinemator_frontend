// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { Calendar, Scenes, Scene, Requisites, Requisite } from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>
                <Route path = { '/:projectId/scenes/:sceneId' }>
                    <Scene />
                </Route>
                <Route path = { '/:projectId/requisites/:requisiteId' }>
                    <Requisite />
                </Route>
                <Route path = { '/:projectId/calendar' }>
                    <Calendar/>
                </Route>
                <Route path = { '/:projectId/scenes' }>
                    <Scenes />
                </Route>
                <Route path = { '/:projectId/requisites' }>
                    <Requisites />
                </Route>

                <Redirect to = { '/:projectId/calendar' } />
            </Switch>
        </Suspense>
    );
};
