// GraphQL
import ReqTypesSchema from '../schemas/reqTypes.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { ReqTypes, ReqTypesVariables } from '../types';

type Options = {
    projectId: string
}

export const useReqTypesQuery = ({ projectId }: Options) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useCustomQuery<ReqTypes, ReqTypesVariables>(ReqTypesSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
