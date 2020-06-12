
// Core
import React from 'react';
import { render } from 'react-dom';

// App
import { App } from './containers/App';

// Init
import { initIconsLibrary } from './assets';

initIconsLibrary();

render(
    <App />,
    document.getElementById('app'),
);
