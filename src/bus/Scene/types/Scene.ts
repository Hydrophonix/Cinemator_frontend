/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scene
// ====================================================

export interface Scene_scene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface Scene_scene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface Scene_scene {
  __typename: "Scene";
  id: string;
  number: number;
  location: string | null;
  description: string | null;
  workdays: Scene_scene_workdays[];
  requisites: Scene_scene_requisites[];
}

export interface Scene {
  scene: Scene_scene;
}

export interface SceneVariables {
  sceneId: string;
}
