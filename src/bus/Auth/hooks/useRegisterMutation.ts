// Core
import { useMutation } from '@apollo/client';

// GraphQL
import RegisterSchema from '../schemas/register.graphql';

// Types
import { Register, RegisterVariables } from '../types';

export const useRegisterMutation = () => {
    return useMutation<Register, RegisterVariables>(RegisterSchema, {
        fetchPolicy: 'no-cache',
    });
};
