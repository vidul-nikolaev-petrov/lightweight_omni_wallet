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

import crypto, { createHash as sourceCreateHash } from 'crypto';

// Patch https://github.com/bitpay/bitcore-lib/issues/34
(function replaceCryptoCreateHash() {
    const orgCreateHash = crypto.createHash;

    crypto.createHash = algo => orgCreateHash(algo === 'ripemd160' ? 'rmd160' : algo);
})();

ReactDOM.render(routes, document.getElementById('root'));