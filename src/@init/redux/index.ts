// Core
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducers
import { inputsReducer as inputs } from './inputs/reducer';
import { togglersReducer as togglers } from './togglers';

// Middlewares
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
    inputs,
    togglers,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
