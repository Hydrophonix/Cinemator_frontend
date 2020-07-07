// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Workdays, WorkdaysVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useWorkdaysQuery = ({ projectId }: OptionsType) => {
    return useCustomQuery<Workdays, WorkdaysVariables>(WorkdaysSchema, {
        variables: { projectId },
    });
};
