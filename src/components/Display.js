import React from 'react';

export default class Display extends React.Component {
    render() {
        return (
            <div style={{display: this.props.if ? 'block' : 'none'}}>
                {this.props.children}
            </div>
        );
    }
};