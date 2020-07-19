// Instruments
import * as types from './types';

export const setCalendarViewAction = (payload: boolean): types.SetCalendarViewAction => ({
    type: types.SET_CALENDAR_VIEW,
    payload,
});
