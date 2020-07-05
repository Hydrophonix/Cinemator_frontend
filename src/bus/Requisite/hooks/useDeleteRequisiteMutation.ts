// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteRequisiteSchema from '../schemas/deleteRequisite.graphql';
import RequisitesSchema from '../schemas/requisites.graphql';

// Types
import { DeleteRequisite, DeleteRequisiteVariables, Requisites } from '../types';

type OptionsTypes = {
    projectId: string
    requisiteId: string
}

export const useDeleteRequisiteMutation = ({ projectId, requisiteId }: OptionsTypes) => {
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

            cache.writeQuery({
                query:     RequisitesSchema,
                variables: { projectId },
                data:      {
                    requisites: requisites.filter((requisite) => requisite.id !== requisiteId),
                },
            });
        },
        variables: { requisiteId },
    });
};
