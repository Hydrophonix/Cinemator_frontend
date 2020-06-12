/* eslint-disable max-len */
// Core
import * as ApolloReactHooks from '@apollo/react-hooks';

// Hooks
import { useCustomQuery } from '../../../hooks';

// GraphQL
import LoginSchema from '../schemas/me.graphql';

// Types
import { Me } from '../types';

export const useMeQuery = (baseOptions?: ApolloReactHooks.MutationHookOptions<Me, {}>) => {
    return useCustomQuery<Me, {}>(LoginSchema, baseOptions);
};
