// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateProjectSchema from '../schemas/createProject.graphql';
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { CreateProject, CreateProjectVariables, OwnedProjects } from '../types';

const defaultOptions: MutationHookOptions<CreateProject, CreateProjectVariables> = {
    update(cache, { data }) {
        const { ownedProjects } = cache.readQuery<OwnedProjects>({ query: OwnedProjectsSchema })!;

        cache.writeQuery({
            query: OwnedProjectsSchema,
            data:  { ownedProjects: ownedProjects.concat([ data!.createProject ]) },
        });
    },
};

export const useCreateProjectMutation = (baseOptions = defaultOptions) => {
    return useMutation<CreateProject, CreateProjectVariables>(CreateProjectSchema, baseOptions);
};
