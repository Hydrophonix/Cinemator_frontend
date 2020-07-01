// Core
import { QueryHookOptions } from '@apollo/react-hooks';

// GraphQL
import RequisiteSchema from '../schemas/requisite.graphql';

// Types
import { Requisite, RequisiteVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useRequisiteQuery = (baseOptions?: QueryHookOptions<Requisite, RequisiteVariables>) => {
    return useCustomQuery<Requisite, RequisiteVariables>(RequisiteSchema, baseOptions);
};
