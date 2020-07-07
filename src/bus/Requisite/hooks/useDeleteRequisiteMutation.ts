// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteRequisiteSchema from '../schemas/deleteRequisite.graphql';
import RequisitesSchema from '../schemas/requisites.graphql';
import ScenesSchema from '../../Scene/schemas/scenes.graphql';

// Types
import { DeleteRequisite, DeleteRequisiteVariables, Requisites } from '../types';
import { Scenes } from '../../Scene';

type OptionsType = {
    projectId: string
    requisiteId: string
}

export const useDeleteRequisiteMutation = ({ projectId, requisiteId }: OptionsType) => {
    return useMutation<DeleteRequisite, DeleteRequisiteVariables>(DeleteRequisiteSchema, {
        update(cache, { data }) {
            const { deleteRequisite } = data!;

            if (!deleteRequisite) {
                throw new Error('Requisite has not been deleted');
            }

            const { requisites } = cache.readQuery<Requisites>({
                query:     RequisitesSchema,
                variables: { projectId },
            })!;

            const { scenes } = cache.readQuery<Scenes>({
                query:     ScenesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     RequisitesSchema,
                variables: { projectId },
                data:      {
                    requisites: requisites.filter((requisite) => requisite.id !== requisiteId),
                },
            });

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.map((scene) => {
                        if (scene.requisites.some((requisite) => requisite.id === requisiteId)) {
                            return {
                                ...scene,
                                requisites: scene.requisites.filter((requisite) => requisite.id !== requisiteId),
                            };
                        }

                        return scene;
                    }),
                },
            });
        },
        variables: { requisiteId },
    });
};
