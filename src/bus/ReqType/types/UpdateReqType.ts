/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReqTypeUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateReqType
// ====================================================

export interface UpdateReqType_updateReqType {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface UpdateReqType {
  updateReqType: UpdateReqType_updateReqType;
}

export interface UpdateReqTypeVariables {
  input: ReqTypeUpdateInput;
  reqTypeId: string;
}
