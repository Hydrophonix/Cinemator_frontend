// Core
import { MutationHookOptions, useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateRequisiteSchema from '../schemas/createRequisite.graphql';
import RequisitesSchema from '../schemas/requisites.graphql';

// Types
import { CreateRequisite, CreateRequisiteVariables, Requisites } from '../types';

const defaultOptions: MutationHookOptions<CreateRequisite, CreateRequisiteVariables> = {
    update(cache, { data }) {
        const { requisites } = cache.readQuery<Requisites>({
            query:     RequisitesSchema,
            variables: { input: data!.createRequisite.projectId },
        })!;

        cache.writeQuery({
            query:     RequisitesSchema,
            variables: { input: data!.createRequisite.projectId }, // TODO: think
            data:      {
                requisites: requisites.concat([ data!.createRequisite ]),
            },
        });
    },
};

export const useCreateRequisiteMutation = (baseOptions = defaultOptions) => {
    return useMutation<CreateRequisite, CreateRequisiteVariables>(CreateRequisiteSchema, baseOptions);
};
