import React from 'react';
export const ProjectContext = React.createContext({});

export const initialState = {
    sceenes: {
        startDate: Date.now(),
        endDate:   Date.now(),
    },
};

export const testReducer = (state: typeof initialState, action: any) => {
    switch (action.type) {
        case 'test_update':
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
