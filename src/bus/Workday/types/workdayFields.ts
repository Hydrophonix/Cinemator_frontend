/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: workdayFields
// ====================================================

export interface workdayFields_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface workdayFields {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  projectId: string;
  scenes: workdayFields_scenes[];
}
