/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationCreateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateLocation
// ====================================================

export interface CreateLocation_createLocation {
  __typename: "Location";
  id: string;
  name: string;
}

export interface CreateLocation {
  createLocation: CreateLocation_createLocation;
}

export interface CreateLocationVariables {
  input: LocationCreateInput;
  projectId: string;
}
