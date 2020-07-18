// Types
import { Reducer } from 'redux';
import { UiState, UiActionTypes } from './types';
import * as types from './types';

const initialState = {
    isCalendarView: true,
};

export const uiReducer: Reducer<UiState, UiActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CALENDAR_VIEW:
            return {
                ...state,
                isCalendarView: !state.isCalendarView,
            };

        default:
            return state;
    }
};
