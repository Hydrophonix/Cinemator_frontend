// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import {
    setDateRangeAction,
    setIndexAction,
    setRequisiteTitleAction,
    setWorkdaysDateRangeAction,
} from './actions';

// Types
import * as types from './types';

export const useInputsRedux = () => {
    const dispatch = useDispatch();

    return {
        inputs:                    useSelector(({ inputs }) => inputs),
        setDateRangeRedux:         (payload: types.DateRange) => dispatch(setDateRangeAction(payload)),
        setWorkdaysDateRangeRedux: (payload: types.DateRange) => dispatch(setWorkdaysDateRangeAction(payload)),
        setIndexRedux:             (payload: types.IndexPayload) => dispatch(setIndexAction(payload)),
        setRequisiteTitleRedux:    (payload: string) => dispatch(setRequisiteTitleAction(payload)),
    };
};
