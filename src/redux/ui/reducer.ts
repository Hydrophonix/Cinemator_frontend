// Types
import { Reducer } from 'redux';
import { UiState, UiActionTypes } from './types';
import * as types from './types';

const initialState = {
    array: [],
};

export const uiReducer: Reducer<UiState, UiActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_INNITIAL_STATE:
            return {
                ...state,
                array: [ '123', '312312' ],
            };

        case types.RESET_TO_INNITIAL_STATE:
            return initialState;

        default:
            return state;
    }
};
