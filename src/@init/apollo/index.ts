// Core
import { ApolloClient, ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { CachePersistor } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

// Instruments
import { tokenRefreshLink } from './refreshTokenLink';
import { GRAPHQL_URL } from '../constants';
import { errorLink } from './errorLink';
import { requestLink } from './requestLink';
import { cache } from './cache';

const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

export const getApolloClient = async () => {
    const persistor = new CachePersistor({
        debug:   process.env.NODE_ENV === 'development',
        cache,
        storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
    });

    const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

    if (currentVersion === SCHEMA_VERSION) {
        await persistor.restore();
    } else {
        await persistor.purge();
        window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
    }

    return new ApolloClient({
        link: ApolloLink.from([
            errorLink,
            requestLink,
            tokenRefreshLink,
            new RetryLink({ attempts: { max: Infinity }}),
            new HttpLink({ uri: GRAPHQL_URL, credentials: 'include' }),
        ]),
        cache,
    });
};