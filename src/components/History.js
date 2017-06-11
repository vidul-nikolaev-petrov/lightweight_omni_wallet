import React from 'react';
import Loading from './Loading';
import { browserHistory, Link } from 'react-router';
import { store as store$ } from '../store';
import { urls as Urls } from '../constants';

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
        <div>
            <AddressHistory />
        </div>
    </div>
);

/*eslint-disable no-unused-vars*/


class AddressHistory extends React.Component {
    constructor(props) {
        super(props);

        store$.subscribe(this);

        this.state = {
            address: store$.get(this, 'address') || null,
            addressData: store$.get(this, 'addressData') || [],
            addressTXdata: store$.get(this, 'addressTXdata') || [],
            error: null,
            isLoading: false,
        };

        this.formChangeAddress = this.formChangeAddress.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.showTXinfo = this.showTXinfo.bind(this);
    }

    formChangeAddress(event) {
        store$.dispatch(this, 'address', [event.target.value], { storeGlobal: true });
    }

    formSubmit(event) {
        event.preventDefault();
        this.getAddressData(); // @TODO: plugin other explorers
    }

    getAddressData(explorer='omniwallet') {
        const urlAddress = Urls.address[explorer];

        this.setState({
            errorAddressData: null,
            isLoading: true,
            addressData: [],
            addressTXdata: [],
        });

        const url = urlAddress.url;
        const options = urlAddress.options(this.state.address);
        const request= fetch(url, options).then(response => response.json());

        const onSuccess = value => {
            this.setState({
                addressData: value.balance,
            });
            return value.balance;
        };

        const onError = error => {
            this.setState({
                errorAddressData: error.message,
                addressData: [],
            });
            return error.message;
        };

        const onComplete = () => {
            this.setState({ isLoading: false });
        };

        store$.dispatch(this, 'addressData', request, {
            onSuccess,
            onError,
            onComplete,
            storeGlobal: true,
        });
    }

    showTXinfo(proxy, event, explorer='omniwallet') {
        const urlTXs = Urls.transactions[explorer];
        const url = urlTXs.url;
        const options = urlTXs.options(this.state.address);

        this.setState({
            errorAddressTXdata: null,
            isLoading: true,
            addressTXdata: [],
        });

        const request = fetch(url, options).then(response => response.json());

        const onSuccess = value => {
            this.setState({
                addressTXdata: value.transactions,
            });
            return value.transactions;
        };

        const onError = error => {
            this.setState({
                errorAddressTXdata: error.message,
                addressTXdata: [],
            });
            return error.message;
        };

        const onComplete = (value) => {
            console.log('TX data updated:', value)
            this.setState({ isLoading: false });
        };

        store$.dispatch(this, 'addressTXdata', request, { onSuccess, onError, onComplete });
    }

    render() {
        return (
          <div>
            <div className="App-intro">
              <br />
              Initial Page {this.state.address}
            </div>

            <div>
              <br />
              <br />
              <form onSubmit={this.formSubmit}>
                <label>
                  Pub key&nbsp;
                  <input type="text" value={this.state.address || ''}
                        onChange={this.formChangeAddress} />&nbsp;
                </label>
                <input style={{display: this.state.isLoading ? 'none' : 'inline'}} type="submit" />
              </form>
            </div>

            <div>
              <ul className="standard">
                {this.state.addressData.map(e =>
                  <li key={e.symbol}>
                    <b>{e.symbol}</b> {e.value}<br />
                  </li>
                )}
              </ul>
              <span className="error">{this.state.errorAddressData}</span>
            </div>

            <div style={{display: this.state.addressData.length ? 'inline' : 'none'}}>
              <span className="link" onClick={this.showTXinfo}>show transactions</span>
            </div>

            <div>
              <ul className="standard">
                {this.state.addressTXdata.filter(e => e.state === 'valid').map(e =>
                  <li key={e.hash}>
                    <b>{e.hash}</b> <br />
                    amount: {e.amount}<br />
                    datetime: {e.time}<br />
                    role: {e.role}
                  </li>
                )}
              </ul>
              <span className="error">{this.state.errorAddressTXdata}</span>
            </div>

            <Loading isLoading={this.state.isLoading} text="loading..." />

          </div>
        );
    }
}