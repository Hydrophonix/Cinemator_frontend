/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteWorkday
// ====================================================

export interface DeleteWorkday_deleteWorkday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  projectId: string;
}

export interface DeleteWorkday {
  deleteWorkday: DeleteWorkday_deleteWorkday;
}

export interface DeleteWorkdayVariables {
  id: string;
}
