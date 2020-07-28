// Instruments
import * as types from './types';

export const setIndexAction = (payload: types.IndexPayload): types.SetIndexAction => ({
    type: types.SET_INDEX,
    payload,
});

export const setScenesDateRangeAction = (payload: types.DateRange): types.SetScenesDateRangeAction => ({
    type: types.SET_SCENES_DATE_RANGE,
    payload,
});

export const setScenesLocationAction = (payload: string): types.SetScenesLocationAction => ({
    type: types.SET_SCENES_LOCATION,
    payload,
});

export const setWorkdaysDateRangeAction = (payload: types.DateRange): types.SetWorkdaysDateRangeAction => ({
    type: types.SET_WORKDAYS_DATE_RANGE,
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
