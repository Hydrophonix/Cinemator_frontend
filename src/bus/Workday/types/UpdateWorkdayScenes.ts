/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWorkdayScenes
// ====================================================

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes_requisites {
  __typename: "Requisite";
  id: string;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  requisites: UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes_requisites[];
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday {
  __typename: "Workday";
  id: string;
  date: string;
  description: string | null;
  scenes: UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes[];
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_locations[];
  workdays: UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_workdays[];
  requisites: UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes_requisites[];
}

export interface UpdateWorkdayScenes_updateWorkdayScenes {
  __typename: "WorkdayUpdateScenesResponse";
  updatedWorkday: UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday;
  updatedScenes: UpdateWorkdayScenes_updateWorkdayScenes_updatedScenes[];
}

export interface UpdateWorkdayScenes {
  updateWorkdayScenes: UpdateWorkdayScenes_updateWorkdayScenes;
}

export interface UpdateWorkdayScenesVariables {
  workdayId: string;
  sceneIds: string[];
}
