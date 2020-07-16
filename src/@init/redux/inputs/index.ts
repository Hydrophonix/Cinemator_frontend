// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import { setDateRangeAction, setGlobalDateRangeAction, setItemIndexAction } from './actions';

// Types
import * as types from './types';

export const useReduxInputs = () => {
    const dispatch = useDispatch();

    return {
        inputs:             useSelector(({ inputs }) => inputs),
        setDateRange:       (options: types.DateRangePayload) => dispatch(setDateRangeAction(options)),
        setGlobalDateRange: (options: types.DateRange) => dispatch(setGlobalDateRangeAction(options)),
        setItemIndex:       (options: types.IndexPayload) => dispatch(setItemIndexAction(options)),
    };
};
