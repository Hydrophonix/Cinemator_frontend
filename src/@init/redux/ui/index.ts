// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import {
    setCalendarViewAction,
} from './actions';

// Types
// import * as types from './types';

export const useUiRedux = () => {
    const dispatch = useDispatch();

    return {
        ui:              useSelector(({ ui }) => ui),
        setCalendarView: (payload: boolean) => dispatch(setCalendarViewAction(payload)),
    };
};
