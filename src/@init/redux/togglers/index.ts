// Core
import { Reducer } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../hooks';
import localStore from 'store';

const isLoggedIn = localStore.get('isLoggedIn');
const isCalendarView = localStore.get('isCalendarView');

const initialState = {
    isOnline:       navigator.onLine,
    isLoggedIn:     typeof isLoggedIn === 'boolean' ? isLoggedIn : false,
    isCalendarView: typeof isCalendarView === 'boolean' ? isCalendarView : true,
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

export const RESET_TOGGLERS_TO_INITIAL = 'RESET_TOGGLERS_TO_INITIAL';
export type ResetTogglersToInitialAction = {
    type: typeof RESET_TOGGLERS_TO_INITIAL
};

type TogglersActions =
    | TogglerCreatorAction
    | ResetTogglersToInitialAction

export const togglersReducer: Reducer<TogglersState, TogglersActions> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOGGLER_STATE:
            return { ...state, [ action.payload.type ]: action.payload.value };

        case RESET_TOGGLERS_TO_INITIAL:
            return {
                isOnline:       navigator.onLine,
                isLoggedIn:     false,
                isCalendarView: true,
            };

        default: return state;
    }
};

type Options = {
    type: TogglersKeys
    value: boolean
};

export const togglerCreatorAction = ({ type, value }: Options): TogglersActions  => ({
    type:    SET_TOGGLER_STATE,
    payload: {
        type,
        value,
    },
});

const resetTogglersToInitialAction = (): TogglersActions  => ({
    type: RESET_TOGGLERS_TO_INITIAL,
});

export const useTogglersRedux = () => {
    const dispatch = useDispatch();

    return {
        togglersRedux:    useSelector<TogglersState>(({ togglers }) => togglers),
        setTogglerAction: (options: Options) => void dispatch(togglerCreatorAction(options)),
        setIsLoggedIn:    async (value: boolean) => {
            await localStore.set('isLoggedIn', value);
            dispatch(togglerCreatorAction({ type: 'isLoggedIn', value }));
        },
        setIsCalendarView: async (value: boolean) => {
            await localStore.set('isCalendarView', value);
            dispatch(togglerCreatorAction({ type: 'isCalendarView', value }));
        },
        resetTogglersToInitial: () => void dispatch(resetTogglersToInitialAction()),
    };
};

