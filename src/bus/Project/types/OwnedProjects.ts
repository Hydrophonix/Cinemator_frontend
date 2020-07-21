/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OwnedProjects
// ====================================================

export interface OwnedProjects_ownedProjects_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface OwnedProjects_ownedProjects {
  __typename: "Project";
  id: string;
  title: string;
  description: string | null;
  locations: OwnedProjects_ownedProjects_locations[];
}

export interface OwnedProjects {
  ownedProjects: OwnedProjects_ownedProjects[];
}
