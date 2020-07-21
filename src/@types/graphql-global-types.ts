/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AuthInput {
  email: string;
  password: string;
}

export interface ProjectCreateInput {
  title: string;
  description?: string | null;
}

export interface ProjectUpdateInput {
  title?: string | null;
  description?: string | null;
}

export interface RequisiteCreateInput {
  number: number;
  title: string;
  description?: string | null;
}

export interface RequisiteUpdateInput {
  number?: number | null;
  title?: string | null;
  description?: string | null;
}

export interface SceneCreateInput {
  number: number;
  description?: string | null;
  location?: string | null;
}

export interface SceneUpdateInput {
  number?: number | null;
  description?: string | null;
  location?: string | null;
}

export interface WorkdayCreateInput {
  date: string;
  description?: string | null;
}

export interface WorkdayUpdateInput {
  date: string;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
