// GraphQL
import RequisiteSchema from '../schemas/requisite.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Requisite, RequisiteVariables } from '../types';

type OptionsType = {
    requisiteId: string
}

export const useRequisiteQuery = ({ requisiteId }: OptionsType) => {
    return useCustomQuery<Requisite, RequisiteVariables>(RequisiteSchema, {
        variables: { requisiteId },
    });
};
