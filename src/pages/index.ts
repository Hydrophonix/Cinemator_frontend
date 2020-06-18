// Core
import { lazy } from 'react';

export const Projects = lazy(() => import(/* webpackChunkName: "Projects" */ './Projects'));
export const Scenes = lazy(() => import(/* webpackChunkName: "Scenes" */ './Scenes'));
export const Requisite = lazy(() => import(/* webpackChunkName: "Requisite" */ './Requisite'));
