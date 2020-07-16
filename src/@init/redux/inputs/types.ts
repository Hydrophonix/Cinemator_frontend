export type DateRange = {
    startDay?: Date
    endDay?: Date
};

export type InputsState = {
    scenesDateRange: DateRange
    requisitesDateRange: DateRange
};

export type InputsKeys = keyof InputsState;

export type DateRangeOptions = {
    dateRange: DateRange
    inputType: keyof InputsState
}

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export type SetDateRangeAction = {
    type: typeof SET_DATE_RANGE;
    payload: DateRangeOptions
};

export const SET_GLOBAL_DATE_RANGE = 'SET_GLOBAL_DATE_RANGE';
export type setGlobalDateRangeAction = {
    type: typeof SET_GLOBAL_DATE_RANGE;
    payload: DateRange
};

export type InputsActionTypes =
    | SetDateRangeAction
    | setGlobalDateRangeAction
