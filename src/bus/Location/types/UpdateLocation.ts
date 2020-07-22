/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationUpdateInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateLocation
// ====================================================

export interface UpdateLocation_updateLocation {
  __typename: "Location";
  id: string;
  name: string;
}

export interface UpdateLocation {
  updateLocation: UpdateLocation_updateLocation;
}

export interface UpdateLocationVariables {
  input: LocationUpdateInput;
  locationId: string;
}
