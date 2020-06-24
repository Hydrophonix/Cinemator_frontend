// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { Scenes, ScenesVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useScenesQuery = (baseOptions?: MutationHookOptions<Scenes, ScenesVariables>) => {
    return useCustomQuery<Scenes, ScenesVariables>(ScenesSchema, baseOptions);
};
