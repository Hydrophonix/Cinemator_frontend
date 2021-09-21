/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: requisiteFields
// ====================================================

export interface requisiteFields_scenes_workdays {
  __typename: "Workday";
  date: string;
}

export interface requisiteFields_scenes {
  __typename: "Scene";
  id: string;
  number: number;
  isCompleted: boolean;
  workdays: requisiteFields_scenes_workdays[];
}

export interface requisiteFields_reqTypes {
  __typename: "ReqType";
  id: string;
  name: string;
}

export interface requisiteFields {
  __typename: "Requisite";
  id: string;
  number: number;
  title: string;
  description: string | null;
  scenes: requisiteFields_scenes[];
  reqTypes: requisiteFields_reqTypes[];
}
