/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkdaysQuery
// ====================================================

export interface WorkdaysQuery_workdays_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface WorkdaysQuery_workdays {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: WorkdaysQuery_workdays_scenes[];
}

export interface WorkdaysQuery {
  workdays: WorkdaysQuery_workdays[];
}

export interface WorkdaysQueryVariables {
  input: string;
}
