// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateWorkdaySchema from '../schemas/updateWorkday.graphql';

// Types
import { UpdateWorkday, UpdateWorkdayVariables } from '../types';

export const useUpdateWorkdayMutation = () => {
    return useMutation<UpdateWorkday, UpdateWorkdayVariables>(UpdateWorkdaySchema);
};
