// GraphQL
import RequisiteSchema from '../schemas/requisite.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Requisite, RequisiteVariables } from '../types';

type OptionsTypes = {
    requisiteId: string
}

export const useRequisiteQuery = ({ requisiteId }: OptionsTypes) => {
    return useCustomQuery<Requisite, RequisiteVariables>(RequisiteSchema, {
        variables: { requisiteId },
    });
};
