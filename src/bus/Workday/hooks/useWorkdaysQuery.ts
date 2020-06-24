// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { WorkdaysQuery, WorkdaysQueryVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useWorkdaysQuery = (baseOptions?: MutationHookOptions<WorkdaysQuery, WorkdaysQueryVariables>) => {
    return useCustomQuery<WorkdaysQuery, WorkdaysQueryVariables>(WorkdaysSchema, baseOptions);
};
