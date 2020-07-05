/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateScene
// ====================================================

export interface CreateScene_createScene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface CreateScene_createScene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface CreateScene_createScene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  workdays: CreateScene_createScene_workdays[];
  requisites: CreateScene_createScene_requisites[];
}

export interface CreateScene {
  createScene: CreateScene_createScene;
}

export interface CreateSceneVariables {
  input: SceneCreateInput;
  projectId: string;
  workdayId: string;
}
