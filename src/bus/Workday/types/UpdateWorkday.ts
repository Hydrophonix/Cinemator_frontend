/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkdayUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateWorkday
// ====================================================

export interface UpdateWorkday_updateWorkday_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface UpdateWorkday_updateWorkday_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: UpdateWorkday_updateWorkday_scenes_requisites[];
}

export interface UpdateWorkday_updateWorkday {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: UpdateWorkday_updateWorkday_scenes[];
}

export interface UpdateWorkday {
  updateWorkday: UpdateWorkday_updateWorkday;
}

export interface UpdateWorkdayVariables {
  input: WorkdayUpdateInput;
  workdayId: string;
}
