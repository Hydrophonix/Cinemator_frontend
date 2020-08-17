// Core
import { useQuery } from '@apollo/client';

// GraphQL
import MeSchema from '../schemas/me.graphql';

// Types
import { MeQuery } from '../types';

export const useMeQuery = () => {
    return useQuery<MeQuery>(MeSchema, {
        fetchPolicy: 'no-cache',
    });
};
