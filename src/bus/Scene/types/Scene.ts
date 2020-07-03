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
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  title: string;
}

export interface Scene_scene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  workdays: Scene_scene_workdays[];
  requisites: Scene_scene_requisites[];
  projectId: string;
}

export interface Scene {
  scene: Scene_scene;
}

export interface SceneVariables {
  id: string;
}
