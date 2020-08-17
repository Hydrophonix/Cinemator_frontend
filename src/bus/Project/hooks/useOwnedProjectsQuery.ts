// GraphQL
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { OwnedProjects } from '../types';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useOwnedProjectsQuery = () => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useCustomQuery<OwnedProjects, {}>(OwnedProjectsSchema, {
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
