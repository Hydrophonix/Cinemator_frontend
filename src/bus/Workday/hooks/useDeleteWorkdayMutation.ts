// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';

export const useDeleteWorkdayMutation = (projectId: string, workdayId: string) => {
    const baseOptions: MutationHookOptions<DeleteWorkday, DeleteWorkdayVariables> = {
        update(cache, { data }) {
            const { deleteWorkday } = data!;

            if (!deleteWorkday) {
                throw new Error('Workday has not been deleted');
            }

            const { workdays } = cache.readQuery<Workdays>({
                query:     WorkdaysSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.filter((workday) => workday.id !== workdayId),
                },
            });
        },
        variables: { id: workdayId },
    };

    return useMutation<DeleteWorkday, DeleteWorkdayVariables>(DeleteWorkdaySchema, baseOptions);
};
