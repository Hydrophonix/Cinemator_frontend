/* eslint-disable max-len */
// Core
import * as ApolloReactHooks from '@apollo/react-hooks';

// GraphQL
import LoginSchema from '../schemas/login.graphql';

// Types
import { Login, LoginVariables } from '../types';

export const useLoginMutation = (baseOptions?: ApolloReactHooks.MutationHookOptions<Login, LoginVariables>) => {
    return ApolloReactHooks.useMutation<Login, LoginVariables>(LoginSchema, baseOptions);
};
