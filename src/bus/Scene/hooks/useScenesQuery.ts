// GraphQL
import ScenesSchema from '../schemas/scenes.graphql';

// Hooks
import { useCustomQuery } from '../../../hooks';

// Types
import { Scenes, ScenesVariables } from '../types';

type OptionsTypes = {
    projectId: string
}

export const useScenesQuery = ({ projectId }: OptionsTypes) => {
    return useCustomQuery<Scenes, ScenesVariables>(ScenesSchema, {
        variables: { projectId },
    });
};
