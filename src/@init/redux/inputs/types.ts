export type DateRange = {
    startDay?: Date
    endDay?: Date
};

export type InputsState = {
    scenesInputs: {
        dateRange: DateRange
        index: number
    }
    requisitesInputs: {
        dateRange: DateRange
        index: number
    }
};

export type InputsKeys = keyof InputsState;

export type DateRangePayload = {
    dateRange: DateRange
    inputType: InputsKeys
}

export type IndexPayload = {
    index: number
    inputType: InputsKeys
}

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export type SetDateRangeAction = {
    type: typeof SET_DATE_RANGE;
    payload: DateRangePayload
};

export const SET_GLOBAL_DATE_RANGE = 'SET_GLOBAL_DATE_RANGE';
export type setGlobalDateRangeAction = {
    type: typeof SET_GLOBAL_DATE_RANGE;
    payload: DateRange
};

export const SET_ITEM_INDEX = 'SET_ITEM_INDEX';
export type setItemIndexAction = {
    type: typeof SET_ITEM_INDEX;
    payload: IndexPayload
};

export type InputsActionTypes =
    | SetDateRangeAction
    | setGlobalDateRangeAction
    | setItemIndexAction
