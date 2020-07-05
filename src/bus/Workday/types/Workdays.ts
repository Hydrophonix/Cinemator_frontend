/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workdays
// ====================================================

export interface Workdays_workdays_scenes {
  __typename: "Scene";
  id: string;
  sceneNumber: number;
}

export interface Workdays_workdays {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: Workdays_workdays_scenes[];
}

export interface Workdays {
  workdays: Workdays_workdays[];
}

export interface WorkdaysVariables {
  projectId: string;
}
