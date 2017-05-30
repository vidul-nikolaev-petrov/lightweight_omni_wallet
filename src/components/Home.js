/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Loading from './Loading';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: null,
            addressData: [],
            addressTXdata: [],
            error: null,
            isLoading: false,
        };

        this.formChangeAddress = this.formChangeAddress.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.showTXinfo = this.showTXinfo.bind(this);
    }

    formChangeAddress(event) {
        this.setState({ address: event.target.value });
    }

    formSubmit(event) {
        event.preventDefault();
        this.getAddressData();
    }

    async getAddressData(event) {
        this.setState({
            errorAddressData: null,
            isLoading: true,
            addressData: [],
            addressTXdata: [],
        });

        try {
            const url = 'https://www.omniwallet.org/v1/address/addr/';
            const body = `addr=${this.state.address}`;
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            };

            const response = await fetch(url, options);
            const data = await response.json();

            await (() => {
                this.setState({ addressData: data.balance });
            })();
        }
        catch (e) {
            this.setState({
                errorAddressData: e.message,
                addressData: [],
            });
        }
        finally {
            this.setState({ isLoading: false });
        }
    }

    async showTXinfo() {
        this.setState({
            errorAddressTXdata: null,
            isLoading: true,
            addressTXdata: [],
        });

        try {
            const url = 'https://www.omniwallet.org/v1/transaction/address';
            const body = `addr=${this.state.address}`; 
            const options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body
            };

            const response = await fetch(url, options);
            const data = await response.json();

            await (() => {
                const addressTXdata = data.transactions;
                this.setState({ addressTXdata });
            })();
        }
        catch (e) {
            this.setState({
                errorAddressTXdata: e.message,
                addressTXdata: [],
            });
        }
        finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
          <div>
            <div className="App-intro">
              <br />
              Initial Page
            </div>

            <div>
              <br />
              <br />
              <form onSubmit={this.formSubmit}>
                <label>
                  Pub key&nbsp;
                  <input type="text" value={this.state.address || ''} onChange={this.formChangeAddress} />&nbsp;
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

export default Home;
