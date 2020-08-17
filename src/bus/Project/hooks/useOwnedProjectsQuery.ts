// Core
import { useQuery } from '@apollo/client';

// GraphQL
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { OwnedProjects } from '../types';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

export const useOwnedProjectsQuery = () => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useQuery<OwnedProjects>(OwnedProjectsSchema, {
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
