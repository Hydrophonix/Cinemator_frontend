/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scenes
// ====================================================

export interface Scenes_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  projectId: string;
}

export interface Scenes {
  scenes: Scenes_scenes[];
}

export interface ScenesVariables {
  projectId: string;
}
