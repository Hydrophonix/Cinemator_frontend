// GraphQL
import WorkdaySchema from '../schemas/workday.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Workday, WorkdayVariables } from '../types';

type OptionsType = {
    workdayId: string
}

export const useWorkdayQuery = ({ workdayId }: OptionsType) => {
    return useCustomQuery<Workday, WorkdayVariables>(WorkdaySchema, {
        variables: { workdayId },
    });
};
