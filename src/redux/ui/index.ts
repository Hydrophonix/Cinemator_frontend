// Core
import { useDispatch } from 'react-redux';

// Hooks
import { useSelector } from '../../hooks';

// Actions
import {
    setInitialStateAction,
    resetAppToInnitialState,
} from './actions';

export const useSelectorUi = () => useSelector(({ ui }) => ui);

export const useUiTest = () => {
    const dispatch = useDispatch();

    return {
        set:   () => dispatch(setInitialStateAction()),
        reset: () => dispatch(resetAppToInnitialState()),
    };
};

// export const useCartModal = () => {
//     const dispatch = useDispatch();

//     return {
//         isCartModalExist:  useSelectorUi().isCartModalExist,
//         setCartModalState: (state: boolean) => dispatch(setCartModalState(state)),
//     };
// };

