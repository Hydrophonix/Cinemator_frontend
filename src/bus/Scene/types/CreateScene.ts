/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateScene
// ====================================================

export interface CreateScene_createScene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  projectId: string;
}

export interface CreateScene {
  createScene: CreateScene_createScene;
}

export interface CreateSceneVariables {
  input: SceneCreateInput;
  projectId: string;
  workdayId: string;
}
