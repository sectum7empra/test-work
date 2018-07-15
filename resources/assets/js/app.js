var isStrict = (function() { return !this; })();
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');
window.globals = {};
window.api_server = 'http://test-work.local:2000/api';
import React from 'react';
import { render } from 'react-dom';

import App from './src/App';

render(
    <App />,
    document.getElementById('root')
);
