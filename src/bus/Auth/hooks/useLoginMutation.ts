// Core
import { useMutation } from '@apollo/client';

// GraphQL
import LoginSchema from '../schemas/login.graphql';

// Types
import { Login, LoginVariables } from '../types';

export const useLoginMutation = () => {
    return useMutation<Login, LoginVariables>(LoginSchema, {
        fetchPolicy: 'no-cache',
    });
};
