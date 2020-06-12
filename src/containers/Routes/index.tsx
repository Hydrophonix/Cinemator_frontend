// Core
import React, { FC, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import * as P from '../../pages';

// Elements
import { Spinner } from '../../elements';

export const Routes: FC = () => {
    return (
        <Suspense fallback = { <Spinner/> }>
            <Switch>
                <Route path = '/:projectId'>
                    <P.Project />
                </Route>
                <Route path = '/'>
                    <P.Projects />
                </Route>
            </Switch>
        </Suspense>
    );
};
