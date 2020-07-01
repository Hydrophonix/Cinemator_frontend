/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScene
// ====================================================

export interface DeleteScene_deleteScene {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  projectId: string;
}

export interface DeleteScene {
  deleteScene: DeleteScene_deleteScene;
}

export interface DeleteSceneVariables {
  id: string;
}
