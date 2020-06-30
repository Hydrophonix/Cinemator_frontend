/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scene
// ====================================================

export interface Scene_scene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  projectId: string;
}

export interface Scene {
  scene: Scene_scene;
}

export interface SceneVariables {
  id: string;
}
