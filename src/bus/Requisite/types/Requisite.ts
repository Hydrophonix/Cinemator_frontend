/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Requisite
// ====================================================

export interface Requisite_requisite {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  projectId: string;
}

export interface Requisite {
  requisite: Requisite_requisite;
}

export interface RequisiteVariables {
  id: string;
}
