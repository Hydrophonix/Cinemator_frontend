/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workday
// ====================================================

export interface Workday_workday_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface Workday_workday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  projectId: string;
  scenes: Workday_workday_scenes[];
}

export interface Workday {
  workday: Workday_workday;
}

export interface WorkdayVariables {
  id: string;
}
