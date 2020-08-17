// Core
import { useQuery } from '@apollo/client';

// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Types
import { Scenes, ScenesVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useScenesQuery = ({ projectId }: OptionsType) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    return useQuery<Scenes, ScenesVariables>(ScenesSchema, {
        variables:   { projectId },
        fetchPolicy: isOnline ? 'cache-and-network' : 'cache-only',
    });
};
