// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteSceneSchema from '../schemas/deleteScene.graphql';
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { DeleteScene, DeleteSceneVariables, Scenes } from '../types';

type OptionsTypes = {
    projectId: string
    sceneId: string
}

export const useDeleteSceneMutation = ({ projectId, sceneId }: OptionsTypes) => {
    return useMutation<DeleteScene, DeleteSceneVariables>(DeleteSceneSchema, {
        update(cache, { data }) {
            const { deleteScene } = data!;

            if (!deleteScene) {
                throw new Error('Scene has not been deleted');
            }

            const { scenes } = cache.readQuery<Scenes>({
                query:     ScenesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.filter((scene) => scene.id !== sceneId),
                },
            });
        },
        variables: { sceneId },
    });
};
