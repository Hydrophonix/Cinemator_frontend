// Core
import { lazy } from 'react';

export const Login = lazy(() => import(/* webpackChunkName: "Login" */ './Login'));
export const Register = lazy(() => import(/* webpackChunkName: "Register" */ './Register'));

export const Projects = lazy(() => import(/* webpackChunkName: "Projects" */ './Projects'));
export const CreateProject = lazy(() => import(/* webpackChunkName: "CreateProject" */ './CreateProject'));

export const Calendar = lazy(() => import(/* webpackChunkName: "Calendar" */ './Calendar'));
export const Workday = lazy(() => import(/* webpackChunkName: "Workday" */ './Workday'));
export const CreateWorkday = lazy(() => import(/* webpackChunkName: "CreateWorkday" */ './CreateWorkday'));

export const Scenes = lazy(() => import(/* webpackChunkName: "Scenes" */ './Scenes'));
export const Scene = lazy(() => import(/* webpackChunkName: "Scene" */ './Scene'));
export const CreateScene = lazy(() => import(/* webpackChunkName: "CreateScene" */ './CreateScene'));

export const Requisites = lazy(() => import(/* webpackChunkName: "Requisites" */ './Requisites'));
export const Requisite = lazy(() => import(/* webpackChunkName: "Requisite" */ './Requisite'));
