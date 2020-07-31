/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scenes
// ====================================================

export interface Scenes_scenes_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface Scenes_scenes_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface Scenes_scenes_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface Scenes_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: Scenes_scenes_locations[];
  workdays: Scenes_scenes_workdays[];
  requisites: Scenes_scenes_requisites[];
}

export interface Scenes {
  scenes: Scenes_scenes[];
}

export interface ScenesVariables {
  projectId: string;
}
