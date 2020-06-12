// Core
import * as ApolloReactHooks from '@apollo/react-hooks';
import { DocumentNode } from 'graphql';

export const useCustomQuery = <TData, TVariables> (
    query: DocumentNode,
    options?: ApolloReactHooks.QueryHookOptions<TData, TVariables>,
) => {
    const result = ApolloReactHooks.useQuery<TData, TVariables>(query, options);

    // Throw API error
    if (result.error) {
        throw result.error;
    }

    return result;
};
