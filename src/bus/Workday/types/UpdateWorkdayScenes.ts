/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWorkdayScenes
// ====================================================

export interface UpdateWorkdayScenes_updateWorkdayScenes_workday_scenes {
  __typename: "Scene";
  id: string;
  title: string | null;
  location: string | null;
  sceneNumber: number;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_workday {
  __typename: "Workday";
  id: string;
  title: string | null;
  date: string;
  projectId: string;
  scenes: UpdateWorkdayScenes_updateWorkdayScenes_workday_scenes[];
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_scenes_workdays {
  __typename: "Workday";
  id: string;
}

export interface UpdateWorkdayScenes_updateWorkdayScenes_scenes {
  __typename: "Scene";
  id: string;
  workdays: UpdateWorkdayScenes_updateWorkdayScenes_scenes_workdays[];
}

export interface UpdateWorkdayScenes_updateWorkdayScenes {
  __typename: "WorkdayUpdateScenesResponce";
  workday: UpdateWorkdayScenes_updateWorkdayScenes_workday;
  scenes: UpdateWorkdayScenes_updateWorkdayScenes_scenes[];
}

export interface UpdateWorkdayScenes {
  updateWorkdayScenes: UpdateWorkdayScenes_updateWorkdayScenes;
}

export interface UpdateWorkdayScenesVariables {
  workdayId: string;
  sceneIds: string[];
}
