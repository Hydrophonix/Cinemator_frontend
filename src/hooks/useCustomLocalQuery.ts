// Core
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Types
import { innitialLocalCache } from '../@init/apollo/localCache';

type LocalCacheTypes = typeof innitialLocalCache;
type LocalCacheKeys = keyof LocalCacheTypes;

export const useCustomLocalQuery = (...values: LocalCacheKeys[]) => {
    const queryString = values.reduce((acc, item) => {
        if (acc.length === 0) {
            return `${item} @client\n`;
        }

        return `${acc}${item} @client\n`;
    }, '');

    const LOCAL_CACHE_QUERY = gql`
        query {
            ${queryString}
        }
    `;

    const result = ApolloReactHooks.useQuery<LocalCacheTypes>(LOCAL_CACHE_QUERY);

    // Throw API error
    if (result.error) {
        throw result.error;
    }

    return result;
};
