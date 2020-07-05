/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSceneRequisites
// ====================================================

export interface UpdateSceneRequisites_updateSceneRequisites_updatedScene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedScene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedScene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  workdays: UpdateSceneRequisites_updateSceneRequisites_updatedScene_workdays[];
  requisites: UpdateSceneRequisites_updateSceneRequisites_updatedScene_requisites[];
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_scenes {
  __typename: "Scene";
  id: string;
  sceneNumber: number;
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedRequisites {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  scenes: UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_scenes[];
}

export interface UpdateSceneRequisites_updateSceneRequisites {
  __typename: "SceneUpdateRequisitesResponse";
  updatedScene: UpdateSceneRequisites_updateSceneRequisites_updatedScene;
  updatedRequisites: UpdateSceneRequisites_updateSceneRequisites_updatedRequisites[];
}

export interface UpdateSceneRequisites {
  updateSceneRequisites: UpdateSceneRequisites_updateSceneRequisites;
}

export interface UpdateSceneRequisitesVariables {
  sceneId: string;
  requisiteIds: string[];
}
