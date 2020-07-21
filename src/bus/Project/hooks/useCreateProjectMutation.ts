// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateProjectSchema from '../schemas/createProject.graphql';
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';

// Types
import { CreateProject, CreateProjectVariables, OwnedProjects } from '../types';

export const useCreateProjectMutation = () => {
    return useMutation<CreateProject, CreateProjectVariables>(CreateProjectSchema, {
        update(cache, { data }) {
            // TODO: Если создавать проект без скачаных проектов выкидывает ошибку
            const { ownedProjects } = cache.readQuery<OwnedProjects>({ query: OwnedProjectsSchema })!;

            cache.writeQuery({
                query: OwnedProjectsSchema,
                data:  {
                    ownedProjects: data
                        ? ownedProjects.concat([ data.createProject ])
                        : ownedProjects,
                },
            });
        },
    });
};
