// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateSceneSchema from '../schemas/createScene.graphql';
import ScenesSchema from '../schemas/scenes.graphql';

// Types
import { CreateScene, CreateSceneVariables, Scenes } from '../types';

type OptionsType = {
    projectId: string
}

export const useCreateSceneMutation = ({ projectId }: OptionsType) => {
    return useMutation<CreateScene, CreateSceneVariables>(CreateSceneSchema, {
        update(cache, { data }) {
            const { scenes } = cache.readQuery<Scenes>({
                query:     ScenesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.concat([ data!.createScene ]),
                },
            });
        },
    });
};
