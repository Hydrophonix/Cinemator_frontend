// Core
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducers
import { uiReducer as ui } from '../../redux/ui/reducer';
import { togglersReducer as togglers } from '../../redux/togglers';

// Middlewares
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
    ui,
    togglers,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
