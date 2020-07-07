// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateRequisiteSchema from '../schemas/createRequisite.graphql';
import RequisitesSchema from '../schemas/requisites.graphql';

// Types
import { CreateRequisite, CreateRequisiteVariables, Requisites } from '../types';

type OptionsType = {
    projectId: string
}

export const useCreateRequisiteMutation = ({ projectId }: OptionsType) => {
    return useMutation<CreateRequisite, CreateRequisiteVariables>(CreateRequisiteSchema, {
        update(cache, { data }) {
            const { requisites } = cache.readQuery<Requisites>({
                query:     RequisitesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     RequisitesSchema,
                variables: { projectId },
                data:      {
                    requisites: requisites.concat([ data!.createRequisite ]),
                },
            });
        },
    });
};
