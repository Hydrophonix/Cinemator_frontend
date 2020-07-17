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
        index: number
    }
};

export type InputsKeys = keyof InputsState;

export type DateRangePayload = {
    dateRange: DateRange
    inputType?: InputsKeys
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

export const SET_ITEM_INDEX = 'SET_ITEM_INDEX';
export type setItemIndexAction = {
    type: typeof SET_ITEM_INDEX;
    payload: IndexPayload
};

export type InputsActionTypes =
    | SetDateRangeAction
    | setItemIndexAction
