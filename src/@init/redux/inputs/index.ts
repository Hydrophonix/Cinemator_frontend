// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import {
    setScenesDateRangeAction,
    setScenesLocationAction,
    setIndexAction,
    setRequisitesTitleAction,
    setRequisitesReqTypeAction,
    setWorkdaysDateRangeAction,
} from './actions';

// Types
import * as types from './types';

export const useInputsRedux = () => {
    const dispatch = useDispatch();

    return {
        inputs:                    useSelector(({ inputs }) => inputs),
        setScenesDateRangeRedux:   (payload: types.DateRange) => void dispatch(setScenesDateRangeAction(payload)),
        setScenesLocationRedux:    (payload: string) => void dispatch(setScenesLocationAction(payload)),
        setWorkdaysDateRangeRedux: (payload: types.DateRange) => void dispatch(setWorkdaysDateRangeAction(payload)),
        setIndexRedux:             (payload: types.IndexPayload) => void dispatch(setIndexAction(payload)),
        setRequisiteTitleRedux:    (payload: string) => void dispatch(setRequisitesTitleAction(payload)),
        setRequisitesReqTypeRedux: (payload: string) => void dispatch(setRequisitesReqTypeAction(payload)),
        setGlobalDateRangeRedux:   (payload: types.DateRange) => {
            dispatch(setScenesDateRangeAction(payload));
            dispatch(setWorkdaysDateRangeAction(payload));
        },
    };
};
