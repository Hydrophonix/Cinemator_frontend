// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteSceneSchema from '../schemas/deleteScene.graphql';
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { DeleteScene, DeleteSceneVariables, Scenes } from '../types';

const defaultOptions: MutationHookOptions<DeleteScene, DeleteSceneVariables> = {
    update(cache, { data }) {
        console.log('update -> data', data);
        const { scenes } = cache.readQuery<Scenes>({
            query:     ScenesSchema,
            variables: { input: data!.deleteScene.projectId },
        })!;

        cache.writeQuery({
            query:     ScenesSchema,
            variables: { input: data!.deleteScene.projectId },
            data:      {
                scenes: scenes.filter(({ id }) => id !== data!.deleteScene.id),
            },
        });
    },
};

export const useDeleteSceneMutation = (baseOptions = defaultOptions) => {
    return useMutation<DeleteScene, DeleteSceneVariables>(DeleteSceneSchema, baseOptions);
};
