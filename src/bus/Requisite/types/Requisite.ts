/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Requisite
// ====================================================

export interface Requisite_requisite_scenes {
  __typename: "Scene";
  id: string;
  number: number;
}

export interface Requisite_requisite {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: Requisite_requisite_scenes[];
}

export interface Requisite {
  requisite: Requisite_requisite;
}

export interface RequisiteVariables {
  requisiteId: string;
}
