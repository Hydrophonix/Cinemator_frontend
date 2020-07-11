/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateScene
// ====================================================

export interface UpdateScene_updateScene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateScene_updateScene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateScene_updateScene {
  __typename: "Scene";
  id: string;
  location: string | null;
  sceneNumber: number;
  workdays: UpdateScene_updateScene_workdays[];
  requisites: UpdateScene_updateScene_requisites[];
}

export interface UpdateScene {
  updateScene: UpdateScene_updateScene;
}

export interface UpdateSceneVariables {
  input: SceneUpdateInput;
  sceneId: string;
}
