// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../../hooks';

// Actions
import { setDateRangeAction, setGlobalDateRangeAction } from './actions';

// Types
import { DateRange, DateRangeOptions } from './types';

export const useReduxInputs = () => {
    const dispatch = useDispatch();

    return {
        inputs:             useSelector(({ inputs }) => inputs),
        setDateRange:       (options: DateRangeOptions) => dispatch(setDateRangeAction(options)),
        setGlobalDateRange: (options: DateRange) => dispatch(setGlobalDateRangeAction(options)),
    };
};
