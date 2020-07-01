// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// GraphQL
import SceneSchema from '../schemas/scene.graphql';

// Types
import { Scene, SceneVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useSceneQuery = (baseOptions?: QueryHookOptions<Scene, SceneVariables>) => {
    return useCustomQuery<Scene, SceneVariables>(SceneSchema, baseOptions);
};
