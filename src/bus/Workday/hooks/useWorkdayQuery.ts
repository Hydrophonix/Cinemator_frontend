// Core
import { MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';

// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';
import WorkdaySchema from '../schemas/workday.graphql';

// Types
import { Workdays, Workday, WorkdayVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

const defaultOptions: QueryHookOptions<Workday, WorkdayVariables> = {
    // update(cache, { data }) {
    //     const { workdays } = cache.readQuery<Workdays>({
    //         query:     WorkdaysSchema,
    //         variables: { input: data!.workday.projectId },
    //     })!;

    //     cache.writeQuery({
    //         query:     WorkdaysSchema,
    //         variables: { input: data!.workday.projectId }, // TODO: think
    //         data:      {
    //             workdays: workdays.concat([ data!.workday ]),
    //         },
    //     });
    // },
};

export const useWorkdayQuery = (baseOptions = defaultOptions) => {
    return useCustomQuery<Workday, WorkdayVariables>(WorkdaySchema, baseOptions);
};
