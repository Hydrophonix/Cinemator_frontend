// Core
import { useMutation } from '@apollo/react-hooks';
import _sortBy from 'lodash/sortBy';

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
            if (!data) {
                throw new Error('Scene create failed');
            }

            try {
                const scenesData = cache.readQuery<Scenes>({
                    query:     ScenesSchema,
                    variables: { projectId },
                })!;

                const updatedScenes = _sortBy([ ...scenesData.scenes, data.createScene ], ({ number }) => number);

                cache.writeQuery({
                    query:     ScenesSchema,
                    variables: { projectId },
                    data:      {
                        scenes: updatedScenes,
                    },
                });
            } catch (error) {}  // eslint-disable-line no-empty
        },
    });
};
