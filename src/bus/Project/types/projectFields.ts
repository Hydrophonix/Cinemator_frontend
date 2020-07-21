/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: projectFields
// ====================================================

export interface projectFields_locations {
  __typename: "Location";
  id: string;
  name: string;
}

export interface projectFields {
  __typename: "Project";
  id: string;
  title: string;
  description: string | null;
  locations: projectFields_locations[];
}
