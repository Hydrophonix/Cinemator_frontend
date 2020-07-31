/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workdays
// ====================================================

export interface Workdays_workdays_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface Workdays_workdays_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: Workdays_workdays_scenes_requisites[];
}

export interface Workdays_workdays {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: Workdays_workdays_scenes[];
}

export interface Workdays {
  workdays: Workdays_workdays[];
}

export interface WorkdaysVariables {
  projectId: string;
}
