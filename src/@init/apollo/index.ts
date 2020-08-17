// Core
import { ApolloClient, ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

// Instruments
import { tokenRefreshLink } from './refreshTokenLink';
import { GRAPHQL_URL } from '../constants';
import { errorLink } from './errorLink';
import { requestLink } from './requestLink';
import { cache } from './cache';
export { getAccessToken } from './getAccessToken';

export const getApolloClient = async () => {
    await persistCache({
        cache,
        storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
        maxSize: false,
        debug:   process.env.NODE_ENV === 'development',
    });

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
