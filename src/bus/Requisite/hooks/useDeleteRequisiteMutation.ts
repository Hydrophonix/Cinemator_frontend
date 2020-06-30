// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteRequisiteSchema from '../schemas/deleteRequisite.graphql';
import RequisitesSchema from '../schemas/requisites.graphql';

// Types
import { DeleteRequisite, DeleteRequisiteVariables, Requisites } from '../types';

const defaultOptions: MutationHookOptions<DeleteRequisite, DeleteRequisiteVariables> = {
    update(cache, { data }) {
        const { requisites } = cache.readQuery<Requisites>({
            query:     RequisitesSchema,
            variables: { input: data!.deleteRequisite.projectId },
        })!;

        cache.writeQuery({
            query:     RequisitesSchema,
            variables: { input: data!.deleteRequisite.projectId },
            data:      {
                requisites: requisites.filter(({ id }) => id !== data!.deleteRequisite.id),
            },
        });
    },
};

export const useDeleteRequisiteMutation = (baseOptions = defaultOptions) => {
    return useMutation<DeleteRequisite, DeleteRequisiteVariables>(DeleteRequisiteSchema, baseOptions);
};
