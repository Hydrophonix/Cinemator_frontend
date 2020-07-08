// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateRequisiteSchema from '../schemas/updateRequisite.graphql';

// Types
import { UpdateRequisite, UpdateRequisiteVariables } from '../types';

export const useUpdateRequisiteMutation = () => {
    return useMutation<UpdateRequisite, UpdateRequisiteVariables>(UpdateRequisiteSchema);
};
