/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import { isEnvProduction } from './constants';
import routes from './routes';
import './index.css';

// Disable console.log in production
if (isEnvProduction) {
    console.log = () => {};
}

ReactDOM.render(routes, document.getElementById('root'));