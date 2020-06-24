// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';

// Types
import { Workdays, WorkdaysVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useWorkdaysQuery = (baseOptions?: MutationHookOptions<Workdays, WorkdaysVariables>) => {
    return useCustomQuery<Workdays, WorkdaysVariables>(WorkdaysSchema, baseOptions);
};
