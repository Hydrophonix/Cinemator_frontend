/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateProject
// ====================================================

export interface CreateProject_createProject {
  __typename: "Project";
  id: string;
  title: string;
  description: string | null;
}

export interface CreateProject {
  /**
   * Create new project
   */
  createProject: CreateProject_createProject;
}

export interface CreateProjectVariables {
  input: ProjectCreateInput;
}
