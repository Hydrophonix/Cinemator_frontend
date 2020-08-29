/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSceneRequisites
// ====================================================

export interface UpdateSceneRequisites_updateSceneRequisites_updatedScene_locations {
  __typename: "Location";
  id: string;
  name: string;
}

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
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateSceneRequisites_updateSceneRequisites_updatedScene_locations[];
  workdays: UpdateSceneRequisites_updateSceneRequisites_updatedScene_workdays[];
  requisites: UpdateSceneRequisites_updateSceneRequisites_updatedScene_requisites[];
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateSceneRequisites_updateSceneRequisites_updatedRequisites {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_scenes[];
  reqTypes: UpdateSceneRequisites_updateSceneRequisites_updatedRequisites_reqTypes[];
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
