// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import LoginSchema from '../schemas/login.graphql';

// Types
import { Login, LoginVariables } from '../types';

export const useLoginMutation = (baseOptions?: MutationHookOptions<Login, LoginVariables>) => {
    return useMutation<Login, LoginVariables>(LoginSchema, baseOptions);
};
