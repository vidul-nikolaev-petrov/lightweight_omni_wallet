import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class History extends React.Component {
    render() {
        return (
            <div>
                <TXhistoryPlaceholder />
            </div>
        );
    }
};

export class HistoryTx extends React.Component {
    render() {
        return (
            <div>
                <div>TX {this.props.params.txid} details here... </div>
                <br />
                <div onClick={browserHistory.goBack}>
                    <b><a className="activeLink">back</a></b>
                </div>
                <br />
                <TXhistoryPlaceholder />
            </div>
        );
    }
};

const TXhistoryPlaceholder = () => (
    <div>
        <span>HISTORY placeholder</span>
        <div>
            <br />dummy TX-s<br />
            <Link to="/history/1">TX 1</Link><br />
            <Link to="/history/2">TX 2</Link><br />
            <Link to="/history/3">TX 3</Link><br />
        </div>
    </div>
);