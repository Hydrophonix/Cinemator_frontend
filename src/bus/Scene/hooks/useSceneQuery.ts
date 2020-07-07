// GraphQL
import SceneSchema from '../schemas/scene.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Scene, SceneVariables } from '../types';

type OptionsType = {
    sceneId: string
}

export const useSceneQuery = ({ sceneId }: OptionsType) => {
    return useCustomQuery<Scene, SceneVariables>(SceneSchema, {
        variables: { sceneId },
    });
};
