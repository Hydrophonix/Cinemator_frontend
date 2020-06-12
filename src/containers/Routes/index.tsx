// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import * as P from '../../pages';

// Elements
import { Spinner } from '../../elements';

export const RoutesPath = {
    Main:     '/',
    Register: '/register',
    Login:    '/login',
    Me:       '/me',
    Game:     '/game',
    Todos:    '/todos',
};

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner/> }>
            <Switch>
                <Route
                    exact
                    path = { RoutesPath.Register }>
                    <P.Register />
                </Route>
                <Route
                    exact
                    path = { RoutesPath.Login }>
                    <P.Login />
                </Route>
                <Route
                    exact
                    path = { RoutesPath.Me }>
                    <P.Me />
                </Route>
                <Route
                    exact
                    path = { RoutesPath.Game }>
                    <P.Game />
                </Route>
                <Route
                    exact
                    path = { RoutesPath.Todos }>
                    <P.Todos />
                </Route>
                <Route path = { RoutesPath.Main }>
                    <P.Main />
                </Route>
            </Switch>
        </Suspense>
    );
};
