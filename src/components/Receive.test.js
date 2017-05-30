import React from 'react';
import ReactDOM from 'react-dom';
import Receive from './Container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Receive />, div);
});
