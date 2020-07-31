/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateScene
// ====================================================

export interface UpdateScene_updateScene_locations {
  __typename: "Location";
  id: string;
  name: string;
}

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
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateScene_updateScene_locations[];
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
