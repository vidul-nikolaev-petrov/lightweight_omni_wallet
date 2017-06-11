/*eslint-disable no-unused-vars*/
import crypto from 'crypto';
import React from 'react';
import ReactDOM from 'react-dom';
import { isEnvProduction } from './constants';
import routes from './routes';
import './index.css';

// Disable console.log in production
if (isEnvProduction) {
    console.log = () => {};
}

// Patch https://github.com/bitpay/bitcore-lib/issues/34
(function replaceCryptoCreateHash() {
    const orgCreateHash = crypto.createHash;

    crypto.createHash = algo => orgCreateHash(algo === 'ripemd160' ? 'rmd160' : algo);
})();

ReactDOM.render(routes, document.getElementById('root'));