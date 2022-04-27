import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/main.scss'
import Store from './redux/store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);