import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import promise from 'es6-promise';
import 'isomorphic-fetch';

import App from './routes.js';

promise.polyfill();

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./routes.js', ()=> {
        const NextApp = require('./routes.js').default;
        render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}

