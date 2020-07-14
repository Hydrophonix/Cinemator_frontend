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
  startDay: string;
  endDay: string;
}

export interface ProjectUpdateInput {
  title?: string | null;
  startDay?: string | null;
  endDay?: string | null;
}

export interface RequisiteCreateInput {
  title: string;
  description?: string | null;
  isOrdered?: boolean | null;
  pricePerDay?: number | null;
}

export interface RequisiteUpdateInput {
  title?: string | null;
  description?: string | null;
  isOrdered?: boolean | null;
  pricePerDay?: number | null;
}

export interface SceneCreateInput {
  title?: string | null;
  location?: string | null;
  sceneNumber: number;
}

export interface SceneUpdateInput {
  title?: string | null;
  location?: string | null;
  sceneNumber?: number | null;
}

export interface WorkdayCreateInput {
  title?: string | null;
  date: string;
}

export interface WorkdayUpdateInput {
  title?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
