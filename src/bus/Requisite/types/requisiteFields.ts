/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: requisiteFields
// ====================================================

export interface requisiteFields_scenes {
  __typename: "Scene";
  id: string;
  sceneNumber: number;
}

export interface requisiteFields {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  scenes: requisiteFields_scenes[];
}
