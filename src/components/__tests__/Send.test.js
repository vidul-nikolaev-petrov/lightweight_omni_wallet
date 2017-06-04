import React from 'react';
import ReactDOM from 'react-dom';
import Send from '../Container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Send />, div);
});
