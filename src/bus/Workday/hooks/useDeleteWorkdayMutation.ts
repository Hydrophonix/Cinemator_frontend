// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';

// Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';
import { Scenes } from '../../Scene';

type OptionsType = {
    projectId: string
    workdayId: string
}

export const useDeleteWorkdayMutation = ({ projectId, workdayId }: OptionsType) => {
    return useMutation<DeleteWorkday, DeleteWorkdayVariables>(DeleteWorkdaySchema, {
        update(cache, { data }) {
            const { deleteWorkday } = data!;

            if (!deleteWorkday) {
                throw new Error('Workday has not been deleted');
            }

            const { workdays } = cache.readQuery<Workdays>({
                query:     WorkdaysSchema,
                variables: { projectId },
            })!;

            const { scenes } = cache.readQuery<Scenes>({
                query:     ScenesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.filter((workday) => workday.id !== workdayId),
                },
            });

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.map((scene) => {
                        if (scene.workdays.some((workday) => workday.id === workdayId)) {
                            return {
                                ...scene,
                                workdays: scene.workdays.filter((workday) => workday.id !== workdayId),
                            };
                        }

                        return scene;
                    }),
                },
            });
        },
        variables: { workdayId },
    });
};
