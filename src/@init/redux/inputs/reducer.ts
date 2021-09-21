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
        dateRange: {
            startDay: void 0,
            endDay:   void 0,
        },
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

const stateObjectKeys = Object.keys(initialState) as types.InputsKeys[];

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
            let newState = state; // eslint-disable-line no-case-declarations

            stateObjectKeys.forEach((key) => {
                newState = {
                    ...newState,
                    [ key ]: {
                        ...state[ key ],
                        dateRange: {
                            ...state[ key ].dateRange,
                            ...action.payload,
                        },
                    },
                };
            });

            return newState;

        case types.SET_INDEX:
            return {
                ...state,
                [ action.payload.inputType ]: {
                    ...state[ action.payload.inputType ],
                    index: action.payload.index,
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
