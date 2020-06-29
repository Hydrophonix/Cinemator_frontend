/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateProject
// ====================================================

export interface CreateProject_createProject_workdays_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface CreateProject_createProject_workdays {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: CreateProject_createProject_workdays_scenes[];
  projectId: string;
}

export interface CreateProject_createProject {
  __typename: "Project";
  id: string;
  ownerId: string;
  startDay: string;
  endDay: string;
  title: string;
  description: string | null;
  workdays: CreateProject_createProject_workdays[];
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
