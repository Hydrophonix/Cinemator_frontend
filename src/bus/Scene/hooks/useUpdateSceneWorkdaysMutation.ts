// Core
import { useMutation } from '@apollo/client';

// GraphQL
import UpdateSceneWorkdaysSchema from '../schemas/updateSceneWorkdays.graphql';

// Types
import { UpdateSceneWorkdays, UpdateSceneWorkdaysVariables } from '../types';

export const useUpdateSceneWorkdaysMutation = () => {
    return useMutation<UpdateSceneWorkdays, UpdateSceneWorkdaysVariables>(UpdateSceneWorkdaysSchema);
};
