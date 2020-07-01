/* eslint-disable max-len */
// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// Hooks
import { useCustomQuery } from '../../../hooks';

// GraphQL
import LoginSchema from '../schemas/me.graphql';

// Types
import { Me } from '../types';

export const useMeQuery = (baseOptions?: QueryHookOptions<Me, {}>) => {
    return useCustomQuery<Me, {}>(LoginSchema, baseOptions);
};
