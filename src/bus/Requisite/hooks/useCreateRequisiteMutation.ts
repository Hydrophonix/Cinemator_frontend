// Core
import { useMutation } from '@apollo/react-hooks';
import _sortBy from 'lodash/sortBy';

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
            if (!data) {
                throw new Error('Requisite create failed');
            }

            try {
                const requisitesData = cache.readQuery<Requisites>({
                    query:     RequisitesSchema,
                    variables: { projectId },
                })!;

                const updatedRequisites = _sortBy(
                    [ ...requisitesData.requisites, data.createRequisite ],
                    ({ number }) => number,
                );

                cache.writeQuery({
                    query:     RequisitesSchema,
                    variables: { projectId },
                    data:      {
                        requisites: updatedRequisites,
                    },
                });
            } catch (error) {} // eslint-disable-line no-empty
        },
    });
};
