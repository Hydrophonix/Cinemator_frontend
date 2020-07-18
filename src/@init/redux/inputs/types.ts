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
        index: number
        title: string
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

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export type SetDateRangeAction = {
    type: typeof SET_DATE_RANGE
    payload: DateRange
};

export const SET_WORKDAYS_DATE_RANGE = 'SET_WORKDAYS_DATE_RANGE';
export type SetWorkdaysDateRangeAction = {
    type: typeof SET_WORKDAYS_DATE_RANGE
    payload: DateRange
};

export const SET_INDEX = 'SET_INDEX';
export type setIndexAction = {
    type: typeof SET_INDEX
    payload: IndexPayload
};

export const SET_REQUISITE_TITLE = 'SET_REQUISITE_TITLE';
export type setRequisiteTitleAction = {
    type: typeof SET_REQUISITE_TITLE
    payload: string
};

export type InputsActionTypes =
    | SetDateRangeAction
    | setIndexAction
    | setRequisiteTitleAction
    | SetWorkdaysDateRangeAction
