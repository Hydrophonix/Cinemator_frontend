// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import {
    Calendar, Workday, CreateWorkday,
    Scenes, Scene, CreateScene,
    Requisites, Requisite,
} from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

type PropTypes = {
}

export const Routes: FC<PropTypes> = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>

                <Route path = { '/:projectId/create-workday/:workdayDate' }>
                    <CreateWorkday/>
                </Route>
                <Route path = { '/:projectId/create-scene' }>
                    <CreateScene/>
                </Route>

                <Route path = { '/:projectId/calendar/:workDayDate' }>
                    <Workday/>
                </Route>
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
