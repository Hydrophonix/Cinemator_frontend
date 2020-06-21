// Core
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Middlewares
import { middlewares } from './middleware';

// Instruments
import { rootReducer } from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export { store };
