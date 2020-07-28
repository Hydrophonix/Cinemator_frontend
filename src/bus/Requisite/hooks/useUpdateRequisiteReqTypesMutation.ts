// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateRequisiteReqTypesSchema from '../schemas/updateRequisiteReqTypes.graphql';

// Types
import { UpdateRequisiteReqTypes, UpdateRequisiteReqTypesVariables } from '../types';

export const useUpdateRequisiteReqTypesMutation = () => {
    return useMutation<UpdateRequisiteReqTypes, UpdateRequisiteReqTypesVariables>(UpdateRequisiteReqTypesSchema);
};
