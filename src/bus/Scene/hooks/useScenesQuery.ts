// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { Scenes, ScenesVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useScenesQuery = ({ projectId }: OptionsType) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useCustomQuery<Scenes, ScenesVariables>(ScenesSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
