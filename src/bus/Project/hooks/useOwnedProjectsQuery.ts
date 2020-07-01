// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// GraphQL
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { OwnedProjects } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useOwnedProjectsQuery = (baseOptions?: QueryHookOptions<OwnedProjects>) => {
    return useCustomQuery<OwnedProjects, {}>(OwnedProjectsSchema, baseOptions);
};
