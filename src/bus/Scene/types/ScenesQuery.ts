/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenesQuery
// ====================================================

export interface ScenesQuery_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface ScenesQuery {
  scenes: ScenesQuery_scenes[];
}

export interface ScenesQueryVariables {
  input: string;
}
