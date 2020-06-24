// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { ScenesQuery, ScenesQueryVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useScenesQuery = (baseOptions?: MutationHookOptions<ScenesQuery, ScenesQueryVariables>) => {
    return useCustomQuery<ScenesQuery, ScenesQueryVariables>(ScenesSchema, baseOptions);
};
