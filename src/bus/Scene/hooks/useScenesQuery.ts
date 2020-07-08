// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Scenes, ScenesVariables } from '../types';

type OptionsType = {
    projectId: string
}

export const useScenesQuery = ({ projectId }: OptionsType) => {
    return useCustomQuery<Scenes, ScenesVariables>(ScenesSchema, {
        variables: { projectId },
    });
};
