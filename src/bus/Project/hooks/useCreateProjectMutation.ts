// Core
import { useMutation } from '@apollo/client';

// GraphQL
import CreateProjectSchema from '../schemas/createProject.graphql';
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { CreateProject, CreateProjectVariables, OwnedProjects } from '../types';

export const useCreateProjectMutation = () => {
    return useMutation<CreateProject, CreateProjectVariables>(CreateProjectSchema, {
        update(cache, { data }) {
            if (!data) {
                throw new Error('Project create failed');
            }

            try {
                const ownedProjectsData = cache.readQuery<OwnedProjects>({ query: OwnedProjectsSchema })!;

                const updatedProjects = [ ...ownedProjectsData.ownedProjects, data.createProject ];

                cache.writeQuery({
                    query: OwnedProjectsSchema,
                    data:  {
                        ownedProjects: updatedProjects,
                    },
                });
            } catch (error) {} // eslint-disable-line no-empty
        },
    });
};
