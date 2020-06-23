
// Core
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

// App initializaion
import {
    client as apolloClient,
    history as routerHistory,
} from './@init';

// App
import { App } from './containers/App';

// Assets
import { initIconsLibrary } from './assets';

// // Init
// import { initIconsLibrary } from './assets';

initIconsLibrary();

render(
    <ApolloProvider client = { apolloClient }>
        <Router history = { routerHistory }>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('app'),
);
