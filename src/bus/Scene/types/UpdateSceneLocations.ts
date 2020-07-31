/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSceneLocations
// ====================================================

export interface UpdateSceneLocations_updateSceneLocations_updatedScene_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateSceneLocations_updateSceneLocations_updatedScene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateSceneLocations_updateSceneLocations_updatedScene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateSceneLocations_updateSceneLocations_updatedScene {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateSceneLocations_updateSceneLocations_updatedScene_locations[];
  workdays: UpdateSceneLocations_updateSceneLocations_updatedScene_workdays[];
  requisites: UpdateSceneLocations_updateSceneLocations_updatedScene_requisites[];
}

export interface UpdateSceneLocations_updateSceneLocations_updatedLocations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateSceneLocations_updateSceneLocations {
  __typename: "SceneUpdateLocationsResponse";
  updatedScene: UpdateSceneLocations_updateSceneLocations_updatedScene;
  updatedLocations: UpdateSceneLocations_updateSceneLocations_updatedLocations[];
}

export interface UpdateSceneLocations {
  updateSceneLocations: UpdateSceneLocations_updateSceneLocations;
}

export interface UpdateSceneLocationsVariables {
  sceneId: string;
  locationIds: string[];
}
