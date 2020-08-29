/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequisiteUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateRequisite
// ====================================================

export interface UpdateRequisite_updateRequisite_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
}

export interface UpdateRequisite_updateRequisite_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateRequisite_updateRequisite {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: UpdateRequisite_updateRequisite_scenes[];
  reqTypes: UpdateRequisite_updateRequisite_reqTypes[];
}

export interface UpdateRequisite {
  updateRequisite: UpdateRequisite_updateRequisite;
}

export interface UpdateRequisiteVariables {
  input: RequisiteUpdateInput;
  requisiteId: string;
}
