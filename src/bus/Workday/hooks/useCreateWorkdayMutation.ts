// Core
import { useMutation } from '@apollo/react-hooks';
import _sortBy from 'lodash/sortBy';

// GraphQL
import CreateWorkdaySchema from '../schemas/createWorkday.graphql';
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { CreateWorkday, CreateWorkdayVariables, Workdays } from '../types';
import { DateRange } from '../../../@init/redux/inputs/types';

type OptionsType = {
    projectId: string
    setGlobalDateRangeRedux: (payload: DateRange) => void
}

export const useCreateWorkdayMutation = ({ projectId, setGlobalDateRangeRedux }: OptionsType) => {
    return useMutation<CreateWorkday, CreateWorkdayVariables>(CreateWorkdaySchema, {
        update(cache, { data }) {
            if (!data) {
                throw new Error('Workday create failed');
            }

            try {
                const workdaysData = cache.readQuery<Workdays>({
                    query:     WorkdaysSchema,
                    variables: { projectId },
                })!;

                const updatedWorkdays = _sortBy(
                    [ ...workdaysData.workdays, data.createWorkday ],
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
            } catch (error) {} // eslint-disable-line no-empty
        },
    });
};
