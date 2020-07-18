// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';

// Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';
import { Scenes } from '../../Scene';
import { DateRange } from '../../../@init/redux/inputs/types';

type OptionsType = {
    projectId: string
    workdayId: string
    setDateRangeRedux: (payload: DateRange) => void
}

export const useDeleteWorkdayMutation = ({ projectId, workdayId, setDateRangeRedux }: OptionsType) => {
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

            const updatedWorkdays = workdays.filter((workday) => workday.id !== workdayId)
                .sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1); // TODO sort workday server side

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: updatedWorkdays,
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

            setDateRangeRedux({
                startDay: new Date(updatedWorkdays[ 0 ].date),
                endDay:   new Date(updatedWorkdays[ updatedWorkdays.length - 1 ].date),
            });
        },
        variables: { workdayId },
    });
};
