// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteProjectSchema from '../schemas/deleteProject.graphql';
import OwnedProjectsSchema from '../schemas/ownedProjects.graphql';
import WorkdaysSchema from '../../Workday/schemas/workdays.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';
import LocationsSchema from '../../Location/schemas/locations.graphql';
import RequisitesSchema from '../../Requisite/schemas/requisites.graphql';

// Types
import { DeleteProject, DeleteProjectVariables, OwnedProjects } from '../types';

type OptionsType = {
    projectId: string
    redirect: Function
}

export const useDeleteProjectMutation = ({ projectId, redirect }: OptionsType) => {
    return useMutation<DeleteProject, DeleteProjectVariables>(DeleteProjectSchema, {
        update(cache, { data }) {
            const { deleteProject } = data!;

            if (!deleteProject) {
                throw new Error('Project has not been deleted');
            }

            redirect();

            try {
                const { ownedProjects } = cache.readQuery<OwnedProjects>({ query: OwnedProjectsSchema })!;

                cache.writeQuery({
                    query: OwnedProjectsSchema,
                    data:  {
                        ownedProjects: ownedProjects.filter((project) => project.id !== projectId),
                    },
                });

                cache.writeQuery({
                    query:     WorkdaysSchema,
                    variables: { projectId },
                    data:      { workdays: []},
                });

                cache.writeQuery({
                    query:     ScenesSchema,
                    variables: { projectId },
                    data:      { scenes: []},
                });

                cache.writeQuery({
                    query:     LocationsSchema,
                    variables: { projectId },
                    data:      { locations: []},
                });

                cache.writeQuery({
                    query:     RequisitesSchema,
                    variables: { projectId },
                    data:      { requisites: []},
                });
            } catch (error) {} // eslint-disable-line no-empty
        },
        variables: { projectId },
    });
};
