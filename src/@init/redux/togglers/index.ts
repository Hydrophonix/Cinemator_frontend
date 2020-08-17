// Core
import { Reducer } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../hooks';
import localStore from 'store';

const isLoggedIn = localStore.get('isLoggedIn');

const initialState = {
    isOnline:   false,
    isLoggedIn: typeof isLoggedIn === 'boolean' ? isLoggedIn : false,
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

type Options = {
    type: TogglersKeys
    value: boolean
};

export const togglerCreatorAction = ({ type, value }: Options): TogglerCreatorAction  => ({
    type:    SET_TOGGLER_STATE,
    payload: {
        type,
        value,
    },
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
    };
};

