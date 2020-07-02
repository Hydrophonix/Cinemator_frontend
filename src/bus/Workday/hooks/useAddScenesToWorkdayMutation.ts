// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import AddScenesToWorkdaySchema from '../schemas/addScenesToWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { AddScenesToWorkday, AddScenesToWorkdayVariables, Workdays } from '../types';

const defaultOptions: MutationHookOptions<AddScenesToWorkday, AddScenesToWorkdayVariables> = {
    update(cache, { data }) {
        const { workdays } = cache.readQuery<Workdays>({
            query:     WorkdaysSchema,
            variables: { projectId: data!.addScenesToWorkday.projectId },
        })!;

        cache.writeQuery({
            query:     WorkdaysSchema,
            variables: { projectId: data!.addScenesToWorkday.projectId },
            data:      {
                workdays: workdays.map((workday) => {
                    if (workday.id === data!.addScenesToWorkday.id) {
                        return data!.addScenesToWorkday;
                    }

                    return workday;
                }),
            },
        });
    },
};

export const useAddScenesToWorkdayMutation = (baseOptions = defaultOptions) => {
    return useMutation<AddScenesToWorkday, AddScenesToWorkdayVariables>(AddScenesToWorkdaySchema, baseOptions);
};
