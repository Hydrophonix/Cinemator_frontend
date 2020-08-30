
// Core
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

// App initializaion
import {
    getApolloClient,
    history as routerHistory,
    store as reduxStore,
    registerServiceWorker,
} from './@init';

// App
import { App } from './containers/App';

// Assets
import { initIconsLibrary } from './assets';
import { Spinner } from './elements';

initIconsLibrary();

const Root = () => {
    const [ client, setClient ] = useState<ApolloClient<NormalizedCacheObject>>();

    useEffect(() => {
        getApolloClient().then((client) => void setClient(client));
    }, []);

    if (!client) {
        return <Spinner />;
    }

    return (
        <ApolloProvider client = { client }>
            <ReduxProvider store = { reduxStore }>
                <Router history = { routerHistory }>
                    <App />
                </Router>
            </ReduxProvider>
        </ApolloProvider>
    );
};

render(<Root />, document.getElementById('app'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    registerServiceWorker();
}
