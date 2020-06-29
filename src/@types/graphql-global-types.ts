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

export interface RequisiteCreateInput {
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

export interface WorkdayCreateInput {
  title?: string | null;
  date: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
