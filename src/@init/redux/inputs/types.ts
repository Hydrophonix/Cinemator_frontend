export type DateRange = {
    startDay?: Date
    endDay?: Date
};

export type InputsState = {
    scenesInputs: {
        dateRange: DateRange
        index: number
        location: string
    }
    requisitesInputs: {
        dateRange: DateRange
        index: number
        title: string
        reqType: string
    }
    workdaysInputs: {
        dateRange: DateRange
    }
};

export type InputsKeys = keyof InputsState;

export type IndexPayload = {
    index: number
    inputType: InputsKeys
}

export type DateRangePayload = {
    dateRange: DateRange
    inputType: InputsKeys
}

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export type SetDateRangeAction = {
    type: typeof SET_DATE_RANGE
    payload: DateRangePayload
};

export const SET_GLOBAL_DATE_RANGE = 'SET_GLOBAL_DATE_RANGE';
export type SetGlobalDateRangeAction = {
    type: typeof SET_GLOBAL_DATE_RANGE
    payload: DateRange
};

export const SET_INDEX = 'SET_INDEX';
export type SetIndexAction = {
    type: typeof SET_INDEX
    payload: IndexPayload
};

export const SET_SCENES_LOCATION = 'SET_SCENES_LOCATION';
export type SetScenesLocationAction = {
    type: typeof SET_SCENES_LOCATION
    payload: string
};

export const SET_REQUISITES_TITLE = 'SET_REQUISITES_TITLE';
export type SetRequisitesTitleAction = {
    type: typeof SET_REQUISITES_TITLE
    payload: string
};

export const SET_REQUISITES_REQTYPE = 'SET_REQUISITES_REQTYPE';
export type SetRequisitesReqTypeAction = {
    type: typeof SET_REQUISITES_REQTYPE
    payload: string
};

export const RESET_INPUTS_TO_INITIAL = 'RESET_INPUTS_TO_INITIAL';
export type ResetInputsToInitialAction = {
    type: typeof RESET_INPUTS_TO_INITIAL
};

export type InputsActionTypes =
    | SetDateRangeAction
    | SetGlobalDateRangeAction
    | SetIndexAction
    | SetRequisitesTitleAction
    | SetRequisitesReqTypeAction
    | SetScenesLocationAction
    | ResetInputsToInitialAction
