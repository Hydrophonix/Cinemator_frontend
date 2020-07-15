// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import { setDateRangeAction } from './actions';

// Types
import { DateRangeOptions } from './types';

export const useSelectorInputs = () => useSelector(({ inputs }) => inputs);

export const useReduxInputs = () => {
    const dispatch = useDispatch();

    return {
        inputs:       useSelectorInputs(),
        setDateRange: (dateRangeOptions: DateRangeOptions) => dispatch(setDateRangeAction(dateRangeOptions)),
    };
};
