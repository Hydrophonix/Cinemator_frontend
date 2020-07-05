// GraphQL
import WorkdaySchema from '../schemas/workday.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Workday, WorkdayVariables } from '../types';

type OptionsTypes = {
    workdayId: string
}

export const useWorkdayQuery = ({ workdayId }: OptionsTypes) => {
    return useCustomQuery<Workday, WorkdayVariables>(WorkdaySchema, {
        variables: { workdayId },
    });
};
