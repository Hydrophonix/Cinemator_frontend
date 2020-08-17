// GraphQL
import LocationsSchema from '../schemas/locations.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { Locations, LocationsVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useLocationsQuery = ({ projectId }: OptionsType) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useCustomQuery<Locations, LocationsVariables>(LocationsSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
