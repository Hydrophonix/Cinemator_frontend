// Core
import { useMutation } from '@apollo/client';

// GraphQL
import UpdateRequisiteScenesSchema from '../schemas/updateRequisiteScenes.graphql';

// Types
import { UpdateRequisiteScenes, UpdateRequisiteScenesVariables } from '../types';

export const useUpdateRequisiteScenesMutation = () => {
    return useMutation<UpdateRequisiteScenes, UpdateRequisiteScenesVariables>(UpdateRequisiteScenesSchema);
};
