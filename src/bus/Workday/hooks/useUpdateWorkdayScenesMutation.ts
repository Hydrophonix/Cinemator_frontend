// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateWorkdayScenesSchema from '../schemas/updateWorkdayScenes.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { UpdateWorkdayScenes, UpdateWorkdayScenesVariables, Workdays } from '../types';

const defaultOptions: MutationHookOptions<UpdateWorkdayScenes, UpdateWorkdayScenesVariables> = {
    update(cache, { data }) {
        console.log('"|_(ʘ_ʘ)_/" =>: update -> cache', cache);
        console.log('"|_(ʘ_ʘ)_/" =>: update -> data', data);
        // const { workdays } = cache.readQuery<Workdays>({
        //     query:     WorkdaysSchema,
        //     variables: { projectId: data!.addScenesToWorkday.projectId },
        // })!;

        // cache.writeQuery({
        //     query:     WorkdaysSchema,
        //     variables: { projectId: data!.addScenesToWorkday.projectId },
        //     data:      {
        //         workdays: workdays.map((workday) => {
        //             if (workday.id === data!.addScenesToWorkday.id) {
        //                 return data!.addScenesToWorkday;
        //             }

        //             return workday;
        //         }),
        //     },
        // });
    },
};

export const useUpdateWorkdayScenesMutation = (baseOptions = defaultOptions) => {
    return useMutation<UpdateWorkdayScenes, UpdateWorkdayScenesVariables>(UpdateWorkdayScenesSchema, baseOptions);
};
