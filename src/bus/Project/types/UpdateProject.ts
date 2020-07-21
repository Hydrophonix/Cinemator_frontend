/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateProject
// ====================================================

export interface UpdateProject_updateProject_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateProject_updateProject {
  __typename: "Project";
  id: string;
  title: string;
  description: string | null;
  locations: UpdateProject_updateProject_locations[];
}

export interface UpdateProject {
  updateProject: UpdateProject_updateProject;
}

export interface UpdateProjectVariables {
  projectId: string;
  input: ProjectUpdateInput;
}
