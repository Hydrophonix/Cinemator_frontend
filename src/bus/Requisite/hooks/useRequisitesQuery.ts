// GraphQL
import RequisitesSchema from '../schemas/requisites.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { Requisites, RequisitesVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useRequisitesQuery = ({ projectId }: OptionsType) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useCustomQuery<Requisites, RequisitesVariables>(RequisitesSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
