// GraphQL
import LocationsSchema from '../schemas/locations.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Locations, LocationsVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useLocationsQuery = ({ projectId }: OptionsType) => {
    return useCustomQuery<Locations, LocationsVariables>(LocationsSchema, {
        variables: { projectId },
    });
};
