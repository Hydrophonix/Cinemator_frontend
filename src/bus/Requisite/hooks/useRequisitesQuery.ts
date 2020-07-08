// GraphQL
import RequisitesSchema from '../schemas/requisites.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Requisites, RequisitesVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useRequisitesQuery = ({ projectId }: OptionsType) => {
    return useCustomQuery<Requisites, RequisitesVariables>(RequisitesSchema, {
        variables: { projectId },
    });
};
