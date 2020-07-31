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

export interface LocationCreateInput {
  name: string;
}

export interface LocationUpdateInput {
  name?: string | null;
}

export interface ProjectCreateInput {
  title: string;
  description?: string | null;
}

export interface ProjectUpdateInput {
  title?: string | null;
  description?: string | null;
}

export interface ReqTypeCreateInput {
  name: string;
}

export interface ReqTypeUpdateInput {
  name?: string | null;
}

export interface RequisiteCreateInput {
  number: number;
  title: string;
  description?: string | null;
}

export interface RequisiteUpdateInput {
  title?: string | null;
  description?: string | null;
}

export interface SceneCreateInput {
  number: number;
  title?: string | null;
  description?: string | null;
}

export interface SceneUpdateInput {
  number?: number | null;
  title?: string | null;
  description?: string | null;
  isCompleted?: boolean | null;
}

export interface UserUpdateInput {
  phone?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface WorkdayCreateInput {
  date: string;
  description?: string | null;
}

export interface WorkdayUpdateInput {
  date?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
