import React from 'react';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <span style={{display: this.props.isLoading ? 'inline' : 'none'}}>
                    {this.props.text ? this.props.text : 'loading...'}
                </span>
            </div>
        );
    }
};