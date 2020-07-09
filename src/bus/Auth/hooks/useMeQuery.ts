// GraphQL
import MeSchema from '../schemas/me.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { MeQuery } from '../types';

export const useMeQuery = () => {
    return useCustomQuery<MeQuery, {}>(MeSchema, {});
};
