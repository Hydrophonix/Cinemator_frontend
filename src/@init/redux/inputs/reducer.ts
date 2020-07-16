// Types
import { Reducer } from 'redux';
import { InputsState, InputsActionTypes } from './types';
import * as types from './types';

const initialState = {
    scenesInputs: {
        dateRange: {
            startDay: void 0,
            endDay:   void 0,
        },
        index: 0,
    },
    requisitesInputs: {
        dateRange: {
            startDay: void 0,
            endDay:   void 0,
        },
        index: 0,
    },
};

export const inputsReducer: Reducer<InputsState, InputsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DATE_RANGE:
            return {
                ...state,
                [ action.payload.inputType ]: {
                    ...state[ action.payload.inputType ],
                    dateRange: {
                        ...state[ action.payload.inputType ].dateRange,
                        ...action.payload.dateRange,
                    },

                },
            };

        case types.SET_GLOBAL_DATE_RANGE:
            return {
                ...state,
                scenesInputs: {
                    ...state.scenesInputs,
                    dateRange: action.payload,
                },
                requisitesInputs: {
                    ...state.requisitesInputs,
                    dateRange: action.payload,
                },
            };


        case types.SET_ITEM_INDEX:
            return {
                ...state,
                [ action.payload.inputType ]: {
                    ...state[ action.payload.inputType ],
                    index: action.payload.index,
                },
            };

        default:
            return state;
    }
};
