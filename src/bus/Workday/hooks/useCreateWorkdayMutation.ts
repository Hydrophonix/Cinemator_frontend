// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateWorkdaySchema from '../schemas/createWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { CreateWorkday, CreateWorkdayVariables, Workdays } from '../types';

type OptionsTypes = {
    projectId: string
}

export const useCreateWorkdayMutation = ({ projectId }: OptionsTypes) => {
    return useMutation<CreateWorkday, CreateWorkdayVariables>(CreateWorkdaySchema, {
        update(cache, { data }) {
            const { workdays } = cache.readQuery<Workdays>({
                query:     WorkdaysSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.concat([ data!.createWorkday ]),
                },
            });
        },
    });
};
