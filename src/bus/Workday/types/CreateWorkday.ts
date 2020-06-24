/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkdayCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateWorkday
// ====================================================

export interface CreateWorkday_createWorkday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
}

export interface CreateWorkday {
  createWorkday: CreateWorkday_createWorkday;
}

export interface CreateWorkdayVariables {
  input: WorkdayCreateInput;
  projectId: string;
}
