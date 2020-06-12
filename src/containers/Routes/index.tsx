// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import * as P from '../../pages';

// Elements
import { Spinner } from '../../elements';

export const RoutesPath = {
    Main: '/',
};

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner/> }>
            <Switch>
                {/* <Route
                    exact
                    path = { RoutesPath.PageName }>
                    <P.PageName />
                </Route> */}
                <Route path = { RoutesPath.Main }>
                    <P.Main />
                </Route>
            </Switch>
        </Suspense>
    );
};
