// Core
import { MutationHookOptions } from '@apollo/react-hooks';

// GraphQL
import RequisitesSchema from '../schemas/requisites.graphql';

// Types
import { Requisites, RequisitesVariables } from '../types';

// Hooks
import { useCustomQuery } from '../../../hooks';

export const useRequisitesQuery = (baseOptions?: MutationHookOptions<Requisites, RequisitesVariables>) => {
    return useCustomQuery<Requisites, RequisitesVariables>(RequisitesSchema, baseOptions);
};
