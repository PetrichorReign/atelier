import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Server } from 'mock-socket';

it('renders without crashing', () => {
  const div = document.createElement('div');
  new Server('ws://localhost:3000');
  ReactDOM.render(<App />, div);
});
