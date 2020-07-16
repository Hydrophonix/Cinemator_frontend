// Instruments
import * as types from './types';

export const setDateRangeAction = (payload: types.DateRangeOptions): types.SetDateRangeAction => ({
    type: types.SET_DATE_RANGE,
    payload,
});

export const setGlobalDateRangeAction = (payload: types.DateRange): types.setGlobalDateRangeAction => ({
    type: types.SET_GLOBAL_DATE_RANGE,
    payload,
});
