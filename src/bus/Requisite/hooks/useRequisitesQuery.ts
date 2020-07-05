// GraphQL
import RequisitesSchema from '../schemas/requisites.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Requisites, RequisitesVariables } from '../types';

type OptionsTypes = {
    projectId: string
}

export const useRequisitesQuery = ({ projectId }: OptionsTypes) => {
    return useCustomQuery<Requisites, RequisitesVariables>(RequisitesSchema, {
        variables: { projectId },
    });
};
