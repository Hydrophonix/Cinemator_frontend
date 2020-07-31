/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSceneWorkdays
// ====================================================

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedScene {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_locations[];
  workdays: UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_workdays[];
  requisites: UpdateSceneWorkdays_updateSceneWorkdays_updatedScene_requisites[];
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays_scenes_requisites[];
}

export interface UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays_scenes[];
}

export interface UpdateSceneWorkdays_updateSceneWorkdays {
  __typename: "SceneUpdateWorkdaysResponse";
  updatedScene: UpdateSceneWorkdays_updateSceneWorkdays_updatedScene;
  updatedWorkdays: UpdateSceneWorkdays_updateSceneWorkdays_updatedWorkdays[];
}

export interface UpdateSceneWorkdays {
  updateSceneWorkdays: UpdateSceneWorkdays_updateSceneWorkdays;
}

export interface UpdateSceneWorkdaysVariables {
  sceneId: string;
  workdayIds: string[];
}
