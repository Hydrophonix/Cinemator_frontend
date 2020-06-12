// Core
import { onError } from 'apollo-link-error';

export const errorLink =  onError(({ graphQLErrors, networkError }) => {
    console.log('<<<ERRORLINK>>>: networkError', networkError);
    console.log('<<<ERRORLINK>>>: graphQLErrors', graphQLErrors);

    // if (graphQLErrors)
    //   graphQLErrors.forEach(({ message, locations, path }) =>
    //     console.log(
    //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //     ),
    //   );
    // if (networkError) console.log(`[Network error]: ${networkError}`);
    //       if (graphQLErrors) {
    //         sendToLoggingService(graphQLErrors);
    //       }
    //       if (networkError) {
    //         logoutUser();
    //       }
    // return forward(operation);
});

