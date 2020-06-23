// Core
import React, { FC, Suspense } from 'react';

// Routes
import { Public } from './Public';
import { Private } from './Private';

// Hooks
import { useReduxTogglers } from '../../../redux/togglers';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    const { toggers } = useReduxTogglers();

    return (
        <Suspense fallback = { <Spinner /> }>
            {
                toggers.isAuthenticated
                    ? <Private />
                    : <Public />
            }
        </Suspense>
    );
};
