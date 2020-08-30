/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteManyScenes
// ====================================================

export interface CompleteManyScenes_completeManyScenes_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface CompleteManyScenes_completeManyScenes_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface CompleteManyScenes_completeManyScenes_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface CompleteManyScenes_completeManyScenes {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: CompleteManyScenes_completeManyScenes_locations[];
  workdays: CompleteManyScenes_completeManyScenes_workdays[];
  requisites: CompleteManyScenes_completeManyScenes_requisites[];
}

export interface CompleteManyScenes {
  completeManyScenes: CompleteManyScenes_completeManyScenes[];
}

export interface CompleteManyScenesVariables {
  sceneIds: string[];
}
