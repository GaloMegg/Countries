import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/main.scss'
import Store from './redux/store/store.js';
import { Provider } from 'react-redux';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);