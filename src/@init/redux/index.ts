// Core
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducers
import { inputsReducer as inputs } from './inputs/reducer';

// Middlewares
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
    inputs,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
