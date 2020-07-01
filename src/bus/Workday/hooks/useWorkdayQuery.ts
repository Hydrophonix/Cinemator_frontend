// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// GraphQL
import WorkdaySchema from '../schemas/workday.graphql';

// Types
import { Workday, WorkdayVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useWorkdayQuery = (baseOptions: QueryHookOptions<Workday, WorkdayVariables>) => {
    return useCustomQuery<Workday, WorkdayVariables>(WorkdaySchema, baseOptions);
};
