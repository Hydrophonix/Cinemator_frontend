/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Scenes
// ====================================================

export interface Scenes_scenes_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface Scenes_scenes_requisites {
  __typename: "Requisite";
  id: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  title: string;
}

export interface Scenes_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
  workdays: Scenes_scenes_workdays[];
  requisites: Scenes_scenes_requisites[];
  projectId: string;
}

export interface Scenes {
  scenes: Scenes_scenes[];
}

export interface ScenesVariables {
  projectId: string;
}
