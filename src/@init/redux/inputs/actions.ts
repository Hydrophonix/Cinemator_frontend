// Instruments
import * as types from './types';

export const setDateRangeAction = (payload: types.DateRangePayload): types.SetDateRangeAction => ({
    type: types.SET_DATE_RANGE,
    payload,
});

export const setItemIndexAction = (payload: types.IndexPayload): types.setItemIndexAction => ({
    type: types.SET_ITEM_INDEX,
    payload,
});
