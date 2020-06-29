// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import WorkdaySchema from '../schemas/workday.graphql';

// Types
import { Workday, WorkdayVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

const defaultOptions: MutationHookOptions<Workday, WorkdayVariables> = {
    // update(cache, { data }) {

    //     const { workdays } = cache.readQuery<Workdays>({
    //         query: WorkdaysSchema,
    //         variables: { input: data!.createWorkday.projectId },
    //     })!;

    //     cache.writeQuery({
    //         query: WorkdaysSchema,
    //         variables: { input: data!.createWorkday.projectId }, // TODO: think
    //         data: {
    //             workdays: workdays.concat([data!.createWorkday]),
    //         },
    //     });
    // }
};

export const useWorkdayQuery = (baseOptions = defaultOptions) => {
    return useCustomQuery<Workday, WorkdayVariables>(WorkdaySchema, baseOptions);
};
