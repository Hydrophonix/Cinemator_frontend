// Core
import { useMutation } from '@apollo/client';
import _sortBy from 'lodash/sortBy';

// GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';

// Redux
import { useInputsRedux } from '../../../@init/redux/inputs';

// Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';
import { Scenes } from '../../Scene';

type OptionsType = {
    projectId: string
    workdayId: string
}

export const useDeleteWorkdayMutation = ({ projectId, workdayId }: OptionsType) => {
    const { setGlobalDateRangeRedux } = useInputsRedux();

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

            const updatedWorkdays = _sortBy(
                workdays.filter((workday) => workday.id !== workdayId),
                ({ date }) => new Date(date),
            );

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: updatedWorkdays,
                },
            });

            updatedWorkdays.length > 0
                ? void setGlobalDateRangeRedux({
                    startDay: new Date(updatedWorkdays[ 0 ].date),
                    endDay:   new Date(updatedWorkdays[ updatedWorkdays.length - 1 ].date),
                })
                : void setGlobalDateRangeRedux({
                    startDay: new Date(),
                    endDay:   new Date(),
                });

            try {
                const { scenes } = cache.readQuery<Scenes>({
                    query:     ScenesSchema,
                    variables: { projectId },
                })!;

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
            } catch (error) { }   // eslint-disable-line no-empty
        },
        variables: { workdayId },
    });
};
