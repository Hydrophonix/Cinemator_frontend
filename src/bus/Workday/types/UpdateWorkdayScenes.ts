/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWorkdayScenes
// ====================================================

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes {
  __typename: "Scene";
  id: string;
  sceneNumber: number;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  scenes: UpdateWorkdayScenes_updateWorkdayScenes_updatedWorkday_scenes[];
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
  location: string | null;
  sceneNumber: number;
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
