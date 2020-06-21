// Core
import { combineReducers } from 'redux';

// Instruments
import { uiReducer as ui } from '../redux/ui/reducer';

export const rootReducer = combineReducers({
    ui,
});

export type AppState = ReturnType<typeof rootReducer>;
