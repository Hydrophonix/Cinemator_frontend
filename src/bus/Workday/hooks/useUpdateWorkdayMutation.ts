// Core
import { useMutation } from '@apollo/react-hooks';
import _sortBy from 'lodash/sortBy';

// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';
import UpdateWorkdaySchema from '../schemas/updateWorkday.graphql';

// Types
import { UpdateWorkday, UpdateWorkdayVariables, Workdays } from '../types';
import { DateRange } from '../../../@init/redux/inputs/types';

type OptionsType = {
    projectId: string
    setGlobalDateRangeRedux: (payload: DateRange) => void
}

export const useUpdateWorkdayMutation = ({ projectId, setGlobalDateRangeRedux }: OptionsType) => {
    return useMutation<UpdateWorkday, UpdateWorkdayVariables>(UpdateWorkdaySchema, {
        update(cache, { data }) {
            const { workdays } = cache.readQuery<Workdays>({
                query:     WorkdaysSchema,
                variables: { projectId },
            })!;

            const updatedWorkdays = _sortBy(
                workdays.map((workday) => {
                    if (workday.date === data!.updateWorkday.date) {
                        return data!.updateWorkday;
                    }

                    return workday;
                }),
                ({ date }) => new Date(date),
            );

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: updatedWorkdays,
                },
            });

            setGlobalDateRangeRedux({
                startDay: new Date(updatedWorkdays[ 0 ].date),
                endDay:   new Date(updatedWorkdays[ updatedWorkdays.length - 1 ].date),
            });
        },
    });
};
