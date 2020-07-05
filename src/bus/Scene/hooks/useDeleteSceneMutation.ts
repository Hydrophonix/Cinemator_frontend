// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import DeleteSceneSchema from '../schemas/deleteScene.graphql';
import ScenesSchema from '../schemas/scenes.graphql';
import WorkdaysSchema from '../../Workday/schemas/workdays.graphql';
import RequisitesSchema from '../../Requisite/schemas/requisites.graphql';

// Types
import { DeleteScene, DeleteSceneVariables, Scenes } from '../types';
import { Workdays } from '../../Workday';
import { Requisites } from '../../Requisite';

type OptionsTypes = {
    projectId: string
    sceneId: string
}

export const useDeleteSceneMutation = ({ projectId, sceneId }: OptionsTypes) => {
    return useMutation<DeleteScene, DeleteSceneVariables>(DeleteSceneSchema, {
        update(cache, { data }) {
            const { deleteScene } = data!;

            if (!deleteScene) {
                throw new Error('Scene has not been deleted');
            }

            const { scenes } = cache.readQuery<Scenes>({ query: ScenesSchema, variables: { projectId }})!;
            const { workdays } = cache.readQuery<Workdays>({ query: WorkdaysSchema, variables: { projectId }})!;
            const { requisites } = cache.readQuery<Requisites>({ query: RequisitesSchema, variables: { projectId }})!;

            cache.writeQuery({
                query:     ScenesSchema,
                variables: { projectId },
                data:      {
                    scenes: scenes.filter((scene) => scene.id !== sceneId),
                },
            });

            cache.writeQuery({
                query:     WorkdaysSchema,
                variables: { projectId },
                data:      {
                    workdays: workdays.map((workday) => {
                        if (workday.scenes.some((scene) => scene.id === sceneId)) {
                            return {
                                ...workday,
                                scenes: workday.scenes.filter((scene) => scene.id !== sceneId),
                            };
                        }

                        return workday;
                    }),
                },
            });

            cache.writeQuery({
                query:     RequisitesSchema,
                variables: { projectId },
                data:      {
                    requisites: requisites.map((requisite) => {
                        if (requisite.scenes.some((scene) => scene.id === sceneId)) {
                            return {
                                ...requisite,
                                scenes: requisite.scenes.filter((scene) => scene.id !== sceneId),
                            };
                        }

                        return requisite;
                    }),
                },
            });
        },
        variables: { sceneId },
    });
};
