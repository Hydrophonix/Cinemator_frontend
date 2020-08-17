// Core
import { useMutation } from '@apollo/client';

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
        variables: { requisiteId },
        update(cache, { data }) {
            const { deleteRequisite } = data!;

            if (!deleteRequisite) {
                throw new Error('Requisite has not been deleted');
            }

            const { requisites } = cache.readQuery<Requisites>({
                query:     RequisitesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     RequisitesSchema,
                variables: { projectId },
                data:      {
                    requisites: requisites.filter((requisite) => requisite.id !== requisiteId),
                },
            });

            try {
                const { scenes } = cache.readQuery<Scenes>({
                    query:     ScenesSchema,
                    variables: { projectId },
                })!;

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
            } catch (error) { } // eslint-disable-line no-empty
        },
    });
};
