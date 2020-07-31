/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkdayCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateWorkday
// ====================================================

export interface CreateWorkday_createWorkday_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface CreateWorkday_createWorkday_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: CreateWorkday_createWorkday_scenes_requisites[];
}

export interface CreateWorkday_createWorkday {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: CreateWorkday_createWorkday_scenes[];
}

export interface CreateWorkday {
  createWorkday: CreateWorkday_createWorkday;
}

export interface CreateWorkdayVariables {
  input: WorkdayCreateInput;
  projectId: string;
}
