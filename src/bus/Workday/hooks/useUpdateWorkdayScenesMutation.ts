// Core
import { useMutation } from '@apollo/client';

// GraphQL
import UpdateWorkdayScenesSchema from '../schemas/updateWorkdayScenes.graphql';


// Types
import { UpdateWorkdayScenes, UpdateWorkdayScenesVariables } from '../types';

export const useUpdateWorkdayScenesMutation = () => {
    return useMutation<UpdateWorkdayScenes, UpdateWorkdayScenesVariables>(UpdateWorkdayScenesSchema);
};
