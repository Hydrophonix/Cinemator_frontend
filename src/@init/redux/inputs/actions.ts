// Instruments
import * as types from './types';

export const setDateRangeAction = (payload: types.DateRange): types.SetDateRangeAction => ({
    type: types.SET_DATE_RANGE,
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

export const setIndexAction = (payload: types.IndexPayload): types.setIndexAction => ({
    type: types.SET_INDEX,
    payload,
});

export const setRequisiteTitleAction = (payload: string): types.setRequisiteTitleAction => ({
    type: types.SET_REQUISITE_TITLE,
    payload,
});
