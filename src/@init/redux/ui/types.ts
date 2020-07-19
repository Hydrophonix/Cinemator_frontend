export type UiState = {
    isCalendarView: boolean
};

// export type UiKeys = keyof UiState;

export const SET_CALENDAR_VIEW = 'SET_CALENDAR_VIEW';
export type SetCalendarViewAction = {
    type: typeof SET_CALENDAR_VIEW
    payload: boolean
};

export type UiActionTypes =
    | SetCalendarViewAction

