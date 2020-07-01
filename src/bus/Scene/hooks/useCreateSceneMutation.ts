// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateSceneSchema from '../schemas/createScene.graphql';
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { CreateScene, CreateSceneVariables, Scenes } from '../types';

const defaultOptions: MutationHookOptions<CreateScene, CreateSceneVariables> = {
    update(cache, { data }) {
        const { scenes } = cache.readQuery<Scenes>({
            query:     ScenesSchema,
            variables: { projectId: data!.createScene.projectId },
        })!;

        cache.writeQuery({
            query:     ScenesSchema,
            variables: { projectId: data!.createScene.projectId }, // TODO: think
            data:      {
                scenes: scenes.concat([ data!.createScene ]),
            },
        });
    },
};

export const useCreateSceneMutation = (baseOptions = defaultOptions) => {
    return useMutation<CreateScene, CreateSceneVariables>(CreateSceneSchema, baseOptions);
};
