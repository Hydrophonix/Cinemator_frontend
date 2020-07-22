// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateSceneLocationsSchema from '../schemas/updateSceneLocations.graphql';

// Types
import { UpdateSceneLocations, UpdateSceneLocationsVariables } from '../types';

export const useUpdateSceneLocationsMutation = () => {
    return useMutation<UpdateSceneLocations, UpdateSceneLocationsVariables>(UpdateSceneLocationsSchema);
};
