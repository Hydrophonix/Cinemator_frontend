// Instruments
import * as types from './types';

export const setIndexAction = (payload: types.IndexPayload): types.SetIndexAction => ({
    type: types.SET_INDEX,
    payload,
});

export const setDateRangeAction = (payload: types.DateRangePayload): types.SetDateRangeAction => ({
    type: types.SET_DATE_RANGE,
    payload,
});

export const setGlobalDateRangeAction = (payload: types.DateRange): types.SetGlobalDateRangeAction => ({
    type: types.SET_GLOBAL_DATE_RANGE,
    payload,
});

export const setScenesLocationAction = (payload: string): types.SetScenesLocationAction => ({
    type: types.SET_SCENES_LOCATION,
    payload,
});

export const setRequisitesTitleAction = (payload: string): types.SetRequisitesTitleAction => ({
    type: types.SET_REQUISITES_TITLE,
    payload,
});

export const setRequisitesReqTypeAction = (payload: string): types.SetRequisitesReqTypeAction => ({
    type: types.SET_REQUISITES_REQTYPE,
    payload,
});

export const resetInputsToInitialAction = (): types.ResetInputsToInitialAction => ({
    type: types.RESET_INPUTS_TO_INITIAL,
});
