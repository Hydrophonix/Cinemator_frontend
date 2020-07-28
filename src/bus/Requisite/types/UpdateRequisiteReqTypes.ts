/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRequisiteReqTypes
// ====================================================

export interface UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite_scenes {
  __typename: "Scene";
  id: string;
  number: number;
}

export interface UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite_scenes[];
  reqTypes: UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite_reqTypes[];
}

export interface UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedReqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateRequisiteReqTypes_updateRequisiteReqTypes {
  __typename: "RequisiteUpdateReqTypesResponse";
  updatedRequisite: UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedRequisite;
  updatedReqTypes: UpdateRequisiteReqTypes_updateRequisiteReqTypes_updatedReqTypes[];
}

export interface UpdateRequisiteReqTypes {
  updateRequisiteReqTypes: UpdateRequisiteReqTypes_updateRequisiteReqTypes;
}

export interface UpdateRequisiteReqTypesVariables {
  reqTypeIds: string[];
  requisiteId: string;
}
