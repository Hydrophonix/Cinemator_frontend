
// Core
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as ReduxProvider } from 'react-redux';

// App initializaion
import {
    client as apolloClient,
    store as reduxStore,
    history as routerHistory,
} from './@init';

// App
import { App } from './containers/App';

// // Init
// import { initIconsLibrary } from './assets';

// initIconsLibrary();

render(
    <ApolloProvider client = { apolloClient }>
        <ReduxProvider store = { reduxStore }>
            <Router history = { routerHistory }>
                <App />
            </Router>
        </ReduxProvider>
    </ApolloProvider>,
    document.getElementById('app'),
);
