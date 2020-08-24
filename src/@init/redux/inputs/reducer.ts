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
        index:    0,
        location: '',
    },
    requisitesInputs: {
        index:   0,
        title:   '',
        reqType: '',
    },
    workdaysInputs: {
        dateRange: {
            startDay: void 0,
            endDay:   void 0,
        },
    },
};

export const inputsReducer: Reducer<InputsState, InputsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SCENES_DATE_RANGE:
            return {
                ...state,
                scenesInputs: {
                    ...state.scenesInputs,
                    dateRange: {
                        ...state.scenesInputs.dateRange,
                        ...action.payload,
                    },
                },
            };

        case types.SET_SCENES_LOCATION:
            return {
                ...state,
                scenesInputs: {
                    ...state.scenesInputs,
                    location: action.payload,
                },
            };

        case types.SET_WORKDAYS_DATE_RANGE:
            return {
                ...state,
                workdaysInputs: {
                    ...state.workdaysInputs,
                    dateRange: {
                        ...state.workdaysInputs.dateRange,
                        ...action.payload,
                    },
                },
            };

        case types.SET_INDEX:
            return {
                ...state,
                [ action.payload.inputType ]: {
                    ...state[ action.payload.inputType ],
                    index: action.payload.index,
                },
            };

        case types.SET_REQUISITES_TITLE:
            return {
                ...state,
                requisitesInputs: {
                    ...state.requisitesInputs,
                    title: action.payload,
                },
            };

        case types.SET_REQUISITES_REQTYPE:
            return {
                ...state,
                requisitesInputs: {
                    ...state.requisitesInputs,
                    reqType: action.payload,
                },
            };

        case types.RESET_INPUTS_TO_INITIAL:
            return initialState;

        default:
            return state;
    }
};
