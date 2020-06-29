/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Requisites
// ====================================================

export interface Requisites_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  projectId: string;
}

export interface Requisites {
  requisites: Requisites_requisites[];
}

export interface RequisitesVariables {
  input: string;
}
