// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { OwnedProjects } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

// export const useCreateProjectMutation = (baseOptions = defaultOptions) => {
//     return useMutation<CreateProject, CreateProjectVariables>(CreateProjectSchema, baseOptions);
// };

export const useOwnedProjectsQuery = (baseOptions?: MutationHookOptions<OwnedProjects>) => {
    return useCustomQuery<OwnedProjects, {}>(OwnedProjectsSchema, baseOptions);
};
