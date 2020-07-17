// Core
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

// Instruments
import { GRAPHQL_URL }      from '../constants';
import { tokenRefreshLink } from './refreshTokenLink';
import { errorLink }        from './errorLink';
import { requestLink }      from './requestLink';

import { typeDefs, resolvers } from './resolvers';

// Innitial local cache
import { innitialLocalCache } from './localCache';

const cache = new InMemoryCache({});

export const client = new ApolloClient<NormalizedCacheObject>({
    link: ApolloLink.from([
        tokenRefreshLink,
        errorLink,
        requestLink,
        new HttpLink({
            uri:         GRAPHQL_URL,
            credentials: 'include',
        }),
    ]),
    cache,
    typeDefs,
    resolvers,
});

cache.writeData({ data: innitialLocalCache });

// ----------------------------------------------------------------------------
// Templates
// ----------------------------------------------------------------------------

// const cache = new InMemoryCache({
//   cacheRedirects: {
//     Query: {
//       movie: (_, { id }, { getCacheKey }) =>
//         getCacheKey({ __typename: 'Movie', id });
//     }
//   }
// });

// const client = new ApolloClient({
//     withClientState({
//       defaults: {
//         isConnected: true
//       },
//       resolvers: {
//         Mutation: {
//           updateNetworkStatus: (_, { isConnected }, { cache }) => {
//             cache.writeData({ data: { isConnected }});
//             return null;
//           }
//         }
//       },
//       cache
//     }),
//     new HttpLink({
//       uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
//       credentials: 'include'
//     })
//   ]),
//   cache
// });
