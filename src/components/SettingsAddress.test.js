import React from 'react';
import ReactDOM from 'react-dom';
import SettingsAddress from './Container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SettingsAddress />, div);
});
