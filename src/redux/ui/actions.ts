// Instruments
import * as types from './types';

export const setInitialStateAction = (): types.SetInitialStateAction => ({
    type: types.SET_INNITIAL_STATE,
});


// export const setInitialViewedProductsState = (
//     viewedProducts: Array<string>,
// ): types.UiSetInitialViewedProductsStateAction => ({
//     type:    types.SET_INITIAL_VIEWED_PRODUCTS_STATE,
//     payload: viewedProducts,
// });

export const resetAppToInnitialState = (): types.UiActionTypes => ({
    type: types.RESET_TO_INNITIAL_STATE,
});
