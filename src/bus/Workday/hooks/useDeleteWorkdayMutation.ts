// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteWorkdaySchema from '../schemas/deleteWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { DeleteWorkday, DeleteWorkdayVariables, Workdays } from '../types';

type OptionsTypes = {
    projectId: string
    workdayId: string
}

export const useDeleteWorkdayMutation = ({ projectId, workdayId }: OptionsTypes) => {
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

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.filter((workday) => workday.id !== workdayId),
                },
            });
        },
        variables: { workdayId },
    });
};
