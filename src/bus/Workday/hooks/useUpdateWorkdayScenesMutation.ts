// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateWorkdayScenesSchema from '../schemas/updateWorkdayScenes.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';

// Types
import { UpdateWorkdayScenes, UpdateWorkdayScenesVariables, Workdays } from '../types';
import { Scenes } from '../../Scene';

type OptionsType = {
    projectId: string
}

export const useUpdateWorkdayScenesMutation = ({ projectId }: OptionsType) => {
    return useMutation<UpdateWorkdayScenes, UpdateWorkdayScenesVariables>(UpdateWorkdayScenesSchema, {
        update(cache, { data, errors }) {
            if (errors) {
                throw new Error('Workday has not been deleted');
            }

            const { updatedWorkday, updatedScenes } = data!.updateWorkdayScenes;

            const { workdays } = cache.readQuery<Workdays>({ query: WorkdaysSchema, variables: { projectId }})!;
            const { scenes } = cache.readQuery<Scenes>({ query: ScenesSchema, variables: { projectId }})!;

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.map((workday) => {
                        if (updatedWorkday.id === workday.id) {
                            return updatedWorkday;
                        }

                        return workday;
                    }),
                },
            });

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.map((scene) => {
                        const updatedScene = updatedScenes.find(
                            (updatedScene) => updatedScene.id === scene.id,
                        );

                        if (updatedScene) {
                            return updatedScene;
                        }

                        return scene;
                    }),
                },
            });
        },
    });
};
