/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthInput } from "./../../../@types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_registerWeb_user_projects {
  __typename: "Project";
  id: string;
  title: string;
}

export interface Register_registerWeb_user {
  __typename: "User";
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  projects: Register_registerWeb_user_projects[];
}

export interface Register_registerWeb {
  __typename: "AuthResponseWeb";
  user: Register_registerWeb_user;
  accessToken: string;
}

export interface Register {
  registerWeb: Register_registerWeb;
}

export interface RegisterVariables {
  input: AuthInput;
}
