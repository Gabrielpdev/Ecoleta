/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes/index';
import history from './services/history';

import GlobalStyles from './styles/global';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ToastContainer autoClose={3000} />
          <GlobalStyles />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
