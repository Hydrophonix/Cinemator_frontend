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
  ownerId: string;
  startDay: string;
  endDay: string;
  title: string;
}

export interface OwnedProjects {
  ownedProjects: OwnedProjects_ownedProjects[];
}
