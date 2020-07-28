// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteReqTypeSchema from '../schemas/deleteReqType.graphql';

// Types
import { DeleteReqType, DeleteReqTypeVariables } from '../types';

export const useDeleteReqTypeMutation = () => {
    return useMutation<DeleteReqType, DeleteReqTypeVariables>(DeleteReqTypeSchema);
};
