// Types
import { Reducer } from 'redux';
import { InputsState, InputsActionTypes } from './types';
import * as types from './types';

const initialState = {
    scenesDateRange:     {},
    requisitesDateRange: {},
};

export const inputsReducer: Reducer<InputsState, InputsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATE_RANGE:
            return {
                ...state,
                [ action.payload.inputType ]: {
                    ...state[ action.payload.inputType ],
                    ...action.payload.dateRange,
                },
            };

        case types.SET_GLOBAL_DATE_RANGE:
            return {
                ...state,
                scenesDateRange: {
                    startDay: action.payload.startDay,
                    endDay:   action.payload.endDay,
                },
                requisitesDateRange: {
                    startDay: action.payload.startDay,
                    endDay:   action.payload.endDay,
                },
            };

        default:
            return state;
    }
};
