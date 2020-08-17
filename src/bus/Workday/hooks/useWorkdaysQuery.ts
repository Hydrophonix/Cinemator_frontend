// Core
import { useQuery } from '@apollo/client';

// GraphQL
import WorkdaysSchema from '../schemas/workdays.graphql';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { Workdays, WorkdaysVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useWorkdaysQuery = ({ projectId }: OptionsType) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useQuery<Workdays, WorkdaysVariables>(WorkdaysSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
