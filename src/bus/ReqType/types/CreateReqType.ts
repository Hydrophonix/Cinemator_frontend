/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReqTypeCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateReqType
// ====================================================

export interface CreateReqType_createReqType {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface CreateReqType {
  createReqType: CreateReqType_createReqType;
}

export interface CreateReqTypeVariables {
  input: ReqTypeCreateInput;
  projectId: string;
}
