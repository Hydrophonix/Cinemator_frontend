// Core
import { useMutation } from '@apollo/client';

// GraphQL
import DeleteLocationSchema from '../schemas/deleteLocation.graphql';

// Types
import { DeleteLocation, DeleteLocationVariables } from '../types';

export const useDeleteLocationMutation = () => {
    return useMutation<DeleteLocation, DeleteLocationVariables>(DeleteLocationSchema);
};
