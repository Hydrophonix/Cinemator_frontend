// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import {
    setIndexAction,
    setDateRangeAction,
    setGlobalDateRangeAction,
    setScenesLocationAction,
    setRequisitesTitleAction,
    setRequisitesReqTypeAction,
    resetInputsToInitialAction,
} from './actions';

// Types
import * as types from './types';

export const useInputsRedux = () => {
    const dispatch = useDispatch();

    return {
        inputs:                  useSelector(({ inputs }) => inputs),
        // Scenes
        setScenesDateRangeRedux: (dateRange: types.DateRange) => void dispatch(setDateRangeAction({
            inputType: 'scenesInputs',
            dateRange,
        })),
        setScenesLocationRedux:    (payload: string) => void dispatch(setScenesLocationAction(payload)),
        // Workdays
        setWorkdaysDateRangeRedux: (dateRange: types.DateRange) => void dispatch(setDateRangeAction({
            inputType: 'workdaysInputs',
            dateRange,
        })),
        // Requisite
        setRequisitesDateRangeRedux: (dateRange: types.DateRange) => void dispatch(setDateRangeAction({
            inputType: 'requisitesInputs',
            dateRange,
        })),
        setIndexRedux:             (payload: types.IndexPayload) => void dispatch(setIndexAction(payload)),
        setRequisiteTitleRedux:    (payload: string) => void dispatch(setRequisitesTitleAction(payload)),
        setRequisitesReqTypeRedux: (payload: string) => void dispatch(setRequisitesReqTypeAction(payload)),
        // Global
        setGlobalDateRangeRedux:   (payload: types.DateRange) => void dispatch(setGlobalDateRangeAction(payload)),
        resetInputsToInitial:      () => void dispatch(resetInputsToInitialAction()),
    };
};
