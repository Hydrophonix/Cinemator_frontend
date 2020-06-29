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
  projectId: string;
}

export interface DeleteScene {
  deleteScene: DeleteScene_deleteScene;
}

export interface DeleteSceneVariables {
  input: string;
}
