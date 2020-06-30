// // Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// // GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// // Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';

const defaultOptions: MutationHookOptions<DeleteWorkday, DeleteWorkdayVariables> = {
    update(cache, { data }) {
        const { workdays } = cache.readQuery<Workdays>({
            query:     WorkdaysSchema,
            variables: { input: data!.deleteWorkday.projectId },
        })!;

        cache.writeQuery({
            query:     WorkdaysSchema,
            variables: { input: data!.deleteWorkday.projectId },
            data:      {
                workdays: workdays.filter(({ id }) => id !== data!.deleteWorkday.id),
            },
        });
    },
};

export const useDeleteWorkdayMutation = (baseOptions = defaultOptions) => {
    return useMutation<DeleteWorkday, DeleteWorkdayVariables>(DeleteWorkdaySchema, baseOptions);
};
