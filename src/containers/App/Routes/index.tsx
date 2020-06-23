// Core
import React, { FC, Suspense } from 'react';

// Routes
import { Public } from './Public';
import { Private } from './Private';

// Hooks
import { useCustomLocalQuery } from '../../../hooks';

// Elements
import { Spinner } from '../../../elements';

export const Routes: FC = () => {
    const { data } = useCustomLocalQuery('isLoggedIn');

    return (
        <Suspense fallback = { <Spinner /> }>
            {
                data!.isLoggedIn
                    ? <Private />
                    : <Public />
            }
        </Suspense>
    );
};
