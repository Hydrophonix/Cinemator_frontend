/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRequisite
// ====================================================

export interface DeleteRequisite_deleteRequisite {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  isOrdered: boolean;
  pricePerDay: number;
  projectId: string;
}

export interface DeleteRequisite {
  deleteRequisite: DeleteRequisite_deleteRequisite;
}

export interface DeleteRequisiteVariables {
  id: string;
}
