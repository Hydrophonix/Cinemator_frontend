/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Locations
// ====================================================

export interface Locations_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface Locations {
  locations: Locations_locations[];
}

export interface LocationsVariables {
  projectId: string;
}
