// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import {
    Calendar, Workday, CreateWorkday, UpdateWorkday,
    Scenes, Scene, CreateScene, UpdateScene,
    Requisites, Requisite, CreateRequisite, UpdateRequisite,
} from '../../../pages';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner /> }>
            <Switch>
                {/* Update */}
                <Route path = { '/:projectId/update-workday/:workdayId' }>
                    <UpdateWorkday />
                </Route>
                <Route path = { '/:projectId/update-scene/:sceneId' }>
                    <UpdateScene />
                </Route>
                <Route path = { '/:projectId/update-requisite/:requisiteId' }>
                    <UpdateRequisite />
                </Route>
                {/* Create */}
                <Route path = { '/:projectId/create-workday/:date' }>
                    <CreateWorkday />
                </Route>
                <Route path = { '/:projectId/create-scene' }>
                    <CreateScene />
                </Route>
                <Route path = { '/:projectId/create-requisite' }>
                    <CreateRequisite />
                </Route>
                {/* Item */}
                <Route path = { '/:projectId/calendar/:workdayId' }>
                    <Workday />
                </Route>
                <Route
                    path = { '/:projectId/scenes/:sceneId' }
                    render = { ({ match }) => {
                        if (match.params.sceneId !== 'locations') {
                            return <Scene />;
                        }

                        return <Scenes />;
                    } }
                />
                <Route
                    path = { '/:projectId/requisites/:requisiteId' }
                    render = { ({ match }) => {
                        if (match.params.requisiteId !== 'types') {
                            return <Requisite />;
                        }

                        return <Requisites />;
                    } }
                />
                {/* List */}
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
