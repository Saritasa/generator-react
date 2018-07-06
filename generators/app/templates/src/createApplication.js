// @flow
import { EntityStore } from 'react-app-core';

import { configureStore } from "./store";

/* eslint-disable import/first */
import 'formdata-polyfill';
import 'blueimp-canvas-to-blob';
import * as React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';
/* eslint-enable import/first */

import './debugger';
import configureStore from './store/configureStore';
import createRoutes from './routing';

import './styles/styles.scss';

const store = configureStore(Map());

const AppContainer = ({ children }) => children;

const syncOpts = {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
};

export function createApplication() {
  const Router = createR
  return (
    <AppContainer>
      <Provider store={store}>{child}</Provider>
    </AppContainer>,
    root,
  );
};

render(createRoutes(syncHistoryWithStore(browserHistory, store, syncOpts)));

if (typeof (module: any).hot === 'object' && (module: any).hot !== null) {
  if (typeof (module: any).hot.accept === 'function') {
    (module: any).hot.accept(['./App/getRoutes', './App/App', './routing', './store/configureStore'], () => {
      setImmediate(() => {
        const createNextRoutes = require('./routing/index').default; // eslint-disable-line global-require

        render(createNextRoutes(syncHistoryWithStore(browserHistory, store, syncOpts)));
      });
    });
  }
}

export function createApplication() {



}