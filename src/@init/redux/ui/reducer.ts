// Core
import localStorage from 'store';

// Types
import { Reducer } from 'redux';
import { UiState, UiActionTypes } from './types';
import * as types from './types';

// Instruments
import { APP_NAME } from '../../constants';

const isCalendarView: boolean | undefined = localStorage.get(`${APP_NAME}:isCalendarView`);

const initialState = {
    isCalendarView: isCalendarView !== void 0 ? isCalendarView : true,
};

export const uiReducer: Reducer<UiState, UiActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CALENDAR_VIEW:
            return {
                ...state,
                isCalendarView: action.payload,
            };

        default:
            return state;
    }
};
