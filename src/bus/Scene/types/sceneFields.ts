/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: sceneFields
// ====================================================

export interface sceneFields_workdays {
  __typename: "Workday";
  id: string;
  date: string;
}

export interface sceneFields_requisites {
  __typename: "Requisite";
  id: string;
  title: string;
}

export interface sceneFields {
  __typename: "Scene";
  id: string;
  number: number;
  location: string | null;
  description: string | null;
  workdays: sceneFields_workdays[];
  requisites: sceneFields_requisites[];
}
