/* eslint-disable max-len */
// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// Hooks
import { useCustomQuery } from '../../../hooks';

// GraphQL
import UsersSchema from '../schemas/users.graphql';

// Types
import { Users } from '../types';

export const useUsersQuery = (baseOptions?: QueryHookOptions<Users, {}>) => {
    return useCustomQuery<Users, {}>(UsersSchema, baseOptions);
};
