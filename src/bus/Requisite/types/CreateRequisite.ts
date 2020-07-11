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
  sceneNumber: number;
}

export interface CreateRequisite_createRequisite {
  __typename: "Requisite";
  id: string;
  title: string;
  description: string | null;
  scenes: CreateRequisite_createRequisite_scenes[];
}

export interface CreateRequisite {
  createRequisite: CreateRequisite_createRequisite;
}

export interface CreateRequisiteVariables {
  input: RequisiteCreateInput;
  projectId: string;
}
