// Core
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

// Instruments
import { GRAPHQL_URL }      from '../constants';
import { tokenRefreshLink } from './refreshTokenLink';
import { errorLink }        from './errorLink';
import { requestLink }      from './requestLink';

export const client = new ApolloClient({
    link: ApolloLink.from([
        tokenRefreshLink,
        errorLink,
        requestLink,
        new HttpLink({
            uri:         GRAPHQL_URL,
            credentials: 'include',
        }),
    ]),
    cache: new InMemoryCache(),
});

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
