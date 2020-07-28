/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Requisites
// ====================================================

export interface Requisites_requisites_scenes {
  __typename: "Scene";
  id: string;
  number: number;
}

export interface Requisites_requisites_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface Requisites_requisites {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: Requisites_requisites_scenes[];
  reqTypes: Requisites_requisites_reqTypes[];
}

export interface Requisites {
  requisites: Requisites_requisites[];
}

export interface RequisitesVariables {
  projectId: string;
}
