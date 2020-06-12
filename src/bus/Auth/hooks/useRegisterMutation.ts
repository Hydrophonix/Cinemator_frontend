// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import RegisterSchema from '../schemas/register.graphql';

// Types
import { Register, RegisterVariables } from '../types';

export const useRegisterMutation = (baseOptions?: MutationHookOptions<Register, RegisterVariables>) => {
    return useMutation<Register, RegisterVariables>(RegisterSchema, baseOptions);
};
