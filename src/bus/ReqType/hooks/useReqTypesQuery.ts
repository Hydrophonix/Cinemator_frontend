// GraphQL
import ReqTypesSchema from '../schemas/reqTypes.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { ReqTypes, ReqTypesVariables } from '../types';

type Options = {
    projectId: string
}

export const useReqTypesQuery = ({ projectId }: Options) => {
    return useCustomQuery<ReqTypes, ReqTypesVariables>(ReqTypesSchema, {
        variables: { projectId },
    });
};
