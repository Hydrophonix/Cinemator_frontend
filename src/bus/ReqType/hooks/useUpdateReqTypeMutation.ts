// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateReqTypeSchema from '../schemas/updateReqType.graphql';

// Types
import { UpdateReqType, UpdateReqTypeVariables } from '../types';

export const useUpdateReqTypeMutation = () => {
    return useMutation<UpdateReqType, UpdateReqTypeVariables>(UpdateReqTypeSchema);
};
