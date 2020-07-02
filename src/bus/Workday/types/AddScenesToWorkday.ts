/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddScenesToWorkday
// ====================================================

export interface AddScenesToWorkday_addScenesToWorkday_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface AddScenesToWorkday_addScenesToWorkday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  projectId: string;
  scenes: AddScenesToWorkday_addScenesToWorkday_scenes[];
}

export interface AddScenesToWorkday {
  addScenesToWorkday: AddScenesToWorkday_addScenesToWorkday;
}

export interface AddScenesToWorkdayVariables {
  sceneIds: string[];
  workdayId: string;
}
