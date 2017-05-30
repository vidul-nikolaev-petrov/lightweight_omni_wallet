import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import React from 'react';
import Container from './components/Container';
import History, { HistoryTx } from './components/History';
import Home from './components/Home';
import Receive from './components/Receive';
import Send from './components/Send';
import Settings from './components/Settings';
import SettingsAddress from './components/SettingsAddress';

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Container}>
            <IndexRoute component={Home} />
            <Route path="history" component={History} />
            <Route path="history/:txid" component={HistoryTx} />
            <Route path="receive" component={Receive} />
            <Route path="send" component={Send} />
            <Route path="settings" component={Settings} />
            <Route path="settings/address" component={SettingsAddress} />
        </Route>
    </Router>
);

module.exports = routes;
