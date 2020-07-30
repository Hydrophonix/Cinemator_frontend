/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: userFields
// ====================================================

export interface userFields_projects {
  __typename: "Project";
  id: string;
  title: string;
}

export interface userFields {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  projects: userFields_projects[];
}
