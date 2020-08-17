// Core
import { useMutation } from '@apollo/client';

// GraphQL
import LogoutSchema from '../schemas/logout.graphql';

// Types
import { LogoutWeb } from '../types';

export const useLogoutMutation = () => {
    return useMutation<LogoutWeb>(LogoutSchema, {
        fetchPolicy: 'no-cache',
    });
};
