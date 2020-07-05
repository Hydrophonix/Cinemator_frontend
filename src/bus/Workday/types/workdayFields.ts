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
  sceneNumber: number;
}

export interface workdayFields {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: workdayFields_scenes[];
}
