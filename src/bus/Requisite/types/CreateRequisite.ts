/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequisiteCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateRequisite
// ====================================================

export interface CreateRequisite_createRequisite_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
}

export interface CreateRequisite_createRequisite_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface CreateRequisite_createRequisite {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: CreateRequisite_createRequisite_scenes[];
  reqTypes: CreateRequisite_createRequisite_reqTypes[];
}

export interface CreateRequisite {
  createRequisite: CreateRequisite_createRequisite;
}

export interface CreateRequisiteVariables {
  input: RequisiteCreateInput;
  projectId: string;
}
