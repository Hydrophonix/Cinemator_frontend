export type UiState = {
    array: Array<string>,
};

export const SET_INNITIAL_STATE = 'SET_INNITIAL_STATE';
export type SetInitialStateAction = {
    type: typeof SET_INNITIAL_STATE;
};

export const RESET_TO_INNITIAL_STATE = 'RESET_TO_INNITIAL_STATE';
export type ResetToInitialStateAction = {
    type: typeof RESET_TO_INNITIAL_STATE;
};

export type UiActionTypes =
    | SetInitialStateAction
    | ResetToInitialStateAction
