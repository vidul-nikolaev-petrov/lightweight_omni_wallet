import React from 'react';
import { browserHistory } from 'react-router';
import bitcoin from '../utils/bitcoin';
import fs from '../utils/fs';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bitcoin: null,
            isLoading: false,
            mouseMovesCounter: 0,
            showMouseMoves: false,
        };

        this.mouseMoves = { counter: 0, limit: 16 * 16, list: [], sublist: [] };
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.generateAddress = this.generateAddress.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.handleMouseMove, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove, false);
    }

    getAddress() {
        this.setState({
            bitcoin: bitcoin.generateAddress(this.mouseMoves.list.slice()),
            getAddress: false,
            mouseMovesCounter: 0,
            showMouseMoves: false,
        });

        this.mouseMoves.counter = 0;
        this.mouseMoves.list = [];
        this.mouseMoves.sublist = [];
    }

    generateAddress() {
        this.setState({ bitcoin: null, getAddress: true });

        if (this.state.mouseMovesCounter >= this.mouseMoves.limit) {
            this.getAddress();
        }
        else {
            this.setState({ showMouseMoves: true });
        }
    }

    handleMouseMove(e) {
        this.mouseMoves.counter++;
        this.mouseMoves.sublist.push(this.seedXY(e.clientX, e.clientY));
        this.setState(state => ({ mouseMovesCounter: state.mouseMovesCounter + 1 }));

        if (this.mouseMoves.counter % 16 === 0) {
            this.mouseMoves.list.push(this.mouseMoves.sublist);
            this.mouseMoves.sublist = [];
        }

        if (this.state.getAddress && this.state.mouseMovesCounter >= this.mouseMoves.limit) {
            this.getAddress();
        }
    }

    seedXY(x, y) {
        x = x || Math.floor(Math.random() * 255);
        y = y || Math.floor(Math.random() * 255);

        return (x * y * (new Date().getMilliseconds() || 1));
    }

    render() {
        return (
            <div>
                <span>SETTINGS ADRESS placeholder</span>
                <br />
                <br />
                <br />
                <div onClick={browserHistory.goBack}>
                    <b><a className="activeLink">back</a></b>
                </div>
                <br />
                <div>
                    <a className="activeLink" onClick={this.generateAddress}>create address</a>
                </div>
                <br />
                <BitcoinAddress data={this.state.bitcoin} />
                <br />
                <div style={{display: this.state.showMouseMoves ? 'block' : 'none'}}>
                    left % {Math.floor((this.state.mouseMovesCounter / this.mouseMoves.limit) * 100)}
                </div>
            </div>
        );
    }
};

const BitcoinAddress = (props) => {
    if (!props.data) return null;

    return (
        <div>
            <br />address: <b>{props.data.address}</b>
            <br />wif: <b>{props.data.wif}</b>
        </div>
    );
};