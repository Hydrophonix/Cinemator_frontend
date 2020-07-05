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
  sceneNumber: number;
}

export interface Requisites_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  scenes: Requisites_requisites_scenes[];
}

export interface Requisites {
  requisites: Requisites_requisites[];
}

export interface RequisitesVariables {
  projectId: string;
}
