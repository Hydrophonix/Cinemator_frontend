/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scene
// ====================================================

export interface Scene_scene_locations {
  __typename: "Location";
  id: string;
  name: string;
}

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
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: Scene_scene_locations[];
  workdays: Scene_scene_workdays[];
  requisites: Scene_scene_requisites[];
}

export interface Scene {
  scene: Scene_scene;
}

export interface SceneVariables {
  sceneId: string;
}
