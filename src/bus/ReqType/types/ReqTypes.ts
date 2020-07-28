/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReqTypes
// ====================================================

export interface ReqTypes_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface ReqTypes {
  reqTypes: ReqTypes_reqTypes[];
}

export interface ReqTypesVariables {
  projectId: string;
}
