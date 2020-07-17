// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import { setDateRangeAction, setItemIndexAction } from './actions';

// Types
import * as types from './types';

export const useReduxInputs = () => {
    const dispatch = useDispatch();

    return {
        inputs:       useSelector(({ inputs }) => inputs),
        setDateRange: (options: types.DateRangePayload) => dispatch(setDateRangeAction(options)),
        setItemIndex: (options: types.IndexPayload) => dispatch(setItemIndexAction(options)),
    };
};
