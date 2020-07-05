// GraphQL
import SceneSchema from '../schemas/scene.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Scene, SceneVariables } from '../types';

type OptionsTypes = {
    sceneId: string
}

export const useSceneQuery = ({ sceneId }: OptionsTypes) => {
    return useCustomQuery<Scene, SceneVariables>(SceneSchema, {
        variables: { sceneId },
    });
};
