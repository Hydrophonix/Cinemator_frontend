import { Reducer } from 'redux';
import { useSelector } from '../../hooks';
import { useDispatch } from 'react-redux';

const initialState = {
    // isInitialized:      false,
    isAuthenticated: false,
};

type TogglersState = typeof initialState;
export type TogglersKeys = keyof TogglersState;

export const SET_TOGGLER_STATE = 'SET_TOGGLER_STATE';

type TogglerCreatorAction = {
    type: typeof SET_TOGGLER_STATE;
    payload: {
        type: TogglersKeys;
        value: boolean;
    }
};

export const togglersReducer: Reducer<TogglersState, TogglerCreatorAction> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOGGLER_STATE:
            return { ...state, [ action.payload.type ]: action.payload.value };

        default: return state;
    }
};

export const togglerCreatorAction = (type: TogglersKeys, value: boolean): TogglerCreatorAction  => ({
    type:    SET_TOGGLER_STATE,
    payload: {
        type,
        value,
    },
});

export const useSelectorTogglers = () => useSelector<TogglersState>(({ togglers }) => togglers);

export const useReduxTogglers = () => {
    const dispatch = useDispatch();

    return {
        toggers:        useSelectorTogglers(),
        togglerCreator: (type: TogglersKeys, value: boolean) => dispatch(togglerCreatorAction(type, value)),
    };
};

