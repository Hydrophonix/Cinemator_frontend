/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRequisiteScenes
// ====================================================

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite_scenes {
  __typename: "Scene";
  id: string;
  number: number;
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite_scenes[];
  reqTypes: UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite_reqTypes[];
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes {
  __typename: "Scene";
  id: string;
  number: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  locations: UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_locations[];
  workdays: UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_workdays[];
  requisites: UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes_requisites[];
}

export interface UpdateRequisiteScenes_updateRequisiteScenes {
  __typename: "RequisiteUpdateScenesResponse";
  updatedRequisite: UpdateRequisiteScenes_updateRequisiteScenes_updatedRequisite;
  updatedScenes: UpdateRequisiteScenes_updateRequisiteScenes_updatedScenes[];
}

export interface UpdateRequisiteScenes {
  updateRequisiteScenes: UpdateRequisiteScenes_updateRequisiteScenes;
}

export interface UpdateRequisiteScenesVariables {
  requisiteId: string;
  sceneIds: string[];
}
