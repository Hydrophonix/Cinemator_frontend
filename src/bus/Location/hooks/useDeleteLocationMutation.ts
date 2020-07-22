// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteLocationSchema from '../schemas/deleteLocation.graphql';

// Types
import { DeleteLocation, DeleteLocationVariables } from '../types';

type OptionsType = {
    projectId: string
    locationId: string
}

export const useDeleteLocationMutation = () => {
    return useMutation<DeleteLocation, DeleteLocationVariables>(DeleteLocationSchema);
};