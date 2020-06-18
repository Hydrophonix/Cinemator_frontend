// Core
import { lazy } from 'react';

export const Projects = lazy(() => import(/* webpackChunkName: "Projects" */ './Projects'));
export const Project = lazy(() => import(/* webpackChunkName: "Project" */ './Project'));
export const Login = lazy(() => import(/* webpackChunkName: "Login" */ './Login'));
export const Register = lazy(() => import(/* webpackChunkName: "Register" */ './Register'));
