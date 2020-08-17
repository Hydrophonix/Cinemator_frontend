// Core
import { useMutation } from '@apollo/client';

// GraphQL
import DeleteReqTypeSchema from '../schemas/deleteReqType.graphql';

// Types
import { DeleteReqType, DeleteReqTypeVariables } from '../types';

export const useDeleteReqTypeMutation = () => {
    return useMutation<DeleteReqType, DeleteReqTypeVariables>(DeleteReqTypeSchema);
};
