// Core
import { useMutation } from '@apollo/client';

// GraphQL
import CompleteManyScenesSchema from '../schemas/completeManyScenes.graphql';


// Types
import { CompleteManyScenes, CompleteManyScenesVariables } from '../../Scene/types';

export const useCompleteManyScenesMutation = () => {
    return useMutation<CompleteManyScenes, CompleteManyScenesVariables>(CompleteManyScenesSchema);
};
