// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateWorkdaySchema from '../schemas/createWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { CreateWorkday, CreateWorkdayVariables, Workdays } from '../types';

const defaultOptions: MutationHookOptions<CreateWorkday, CreateWorkdayVariables> = {
    update(cache, { data }) {
        const { workdays } = cache.readQuery<Workdays>({ query: WorkdaysSchema })!;

        cache.writeQuery({
            query: WorkdaysSchema,
            data:  {
                workdays: data
                    ? workdays.concat([ data.createWorkday ])
                    : workdays,
            },
        });
    },
};

export const useCreateWorkdayMutation = (baseOptions = defaultOptions) => {
    return useMutation<CreateWorkday, CreateWorkdayVariables>(CreateWorkdaySchema, baseOptions);
};
