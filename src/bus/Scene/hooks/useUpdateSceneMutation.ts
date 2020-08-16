// Core
import { useMutation } from '@apollo/client';

// GraphQL
import UpdateSceneSchema from '../schemas/updateScene.graphql';

// Types
import { UpdateScene, UpdateSceneVariables } from '../types';

export const useUpdateSceneMutation = () => {
    return useMutation<UpdateScene, UpdateSceneVariables>(UpdateSceneSchema);
};
