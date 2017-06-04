/*eslint-disable no-unused-vars*/
import React from 'react';
import Display from './Display';
import Loading from './Loading';
import fs from '../utils/fs';
import { Link } from 'react-router';
import { filenameWallet } from '../constants';
import { store as store$ } from '../store';
import { thisPath } from '../utils/fs';
import '../App.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        store$.subscribe(this);

        this.state = {
            error: null,
            isLoading: true,
            walletExists: false,
            walletData: '',
            errorWalletData: false,
        };
    }

    componentDidMount() {
        const readWalletFile = fs.readFile(thisPath(filenameWallet), 'utf8');

        const onSuccess = undefined; // @TODO: parse logic
        
        const onError = error => {
            this.setState({
                errorWalletData: error.code,
                walletExists: error.code === 'ENOENT',
                isLoading: false,
            });
        };
        
        const onComplete = () => {
            this.setState({ 
                errorWalletData: false,
                isLoading: false,
            });
        };

        store$.dispatch(this, 'walletData', readWalletFile, { onSuccess, onError, onComplete });
    }

    render() {
        return (
          <div>
            <div className="App-intro">
              Initial Page
            </div>

            <div>
                {this.state.walletData}<br />
                <Display if={this.state.errorWalletData}>
                    error code: {this.state.errorWalletData}<br />
                    wallet does not exist: {this.state.walletExists.toString()}<br />
                </Display>
            </div>

            <Loading isLoading={this.state.isLoading} text="loading wallet file..." />
          </div>
        );
    }
}

export default Home;