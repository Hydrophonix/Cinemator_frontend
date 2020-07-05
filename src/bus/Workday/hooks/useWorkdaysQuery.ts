// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Workdays, WorkdaysVariables } from '../types';

type OptionsTypes = {
    projectId: string
}

export const useWorkdaysQuery = ({ projectId }: OptionsTypes) => {
    return useCustomQuery<Workdays, WorkdaysVariables>(WorkdaysSchema, {
        variables: { projectId },
    });
};
