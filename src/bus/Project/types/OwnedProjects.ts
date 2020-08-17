/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OwnedProjects
// ====================================================

export interface OwnedProjects_ownedProjects {
  __typename: "Project";
  id: string;
  title: string;
  description: string | null;
}

export interface OwnedProjects {
  ownedProjects: OwnedProjects_ownedProjects[];
}
