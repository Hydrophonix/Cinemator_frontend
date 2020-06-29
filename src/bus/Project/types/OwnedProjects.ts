/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OwnedProjects
// ====================================================

export interface OwnedProjects_ownedProjects_workdays_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface OwnedProjects_ownedProjects_workdays {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: OwnedProjects_ownedProjects_workdays_scenes[];
  projectId: string;
}

export interface OwnedProjects_ownedProjects {
  __typename: "Project";
  id: string;
  ownerId: string;
  startDay: string;
  endDay: string;
  title: string;
  description: string | null;
  workdays: OwnedProjects_ownedProjects_workdays[];
}

export interface OwnedProjects {
  ownedProjects: OwnedProjects_ownedProjects[];
}
