// Instruments
import * as types from './types';

export const setDateRangeAction = (payload: types.DateRangeOptions): types.SetDateRangeAction => ({
    type: types.SET_DATE_RANGE,
    payload,
});
