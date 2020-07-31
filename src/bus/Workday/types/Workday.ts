/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workday
// ====================================================

export interface Workday_workday_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface Workday_workday_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: Workday_workday_scenes_requisites[];
}

export interface Workday_workday {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: Workday_workday_scenes[];
}

export interface Workday {
  workday: Workday_workday;
}

export interface WorkdayVariables {
  workdayId: string;
}
