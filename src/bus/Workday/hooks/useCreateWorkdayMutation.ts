// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateWorkdaySchema from '../schemas/createWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { CreateWorkday, CreateWorkdayVariables, Workdays } from '../types';
import { DateRange } from '../../../@init/redux/inputs/types';

type OptionsType = {
    projectId: string
    setGlobalDateRange: (options: DateRange) => void
}

export const useCreateWorkdayMutation = ({ projectId, setGlobalDateRange }: OptionsType) => {
    return useMutation<CreateWorkday, CreateWorkdayVariables>(CreateWorkdaySchema, {
        update(cache, { data }) {
            const { workdays } = cache.readQuery<Workdays>({
                query:     WorkdaysSchema,
                variables: { projectId },
            })!;

            const updatedWorkdays = [ ...workdays, data!.createWorkday ]
                .sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1); // TODO sort workday server side

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: updatedWorkdays,
                },
            });

            setGlobalDateRange({
                startDay: new Date(updatedWorkdays[ 0 ].date),
                endDay:   new Date(updatedWorkdays[ updatedWorkdays.length - 1 ].date),
            });
        },
    });
};
