// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import { createApplication } from './createApplication';
import registerServiceWorker from './registerServiceWorker';


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

const render = function(child) {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Create element with id #root before start the app, please.');
  }

  ReactDOM.unmountComponentAtNode(root);

  ReactDOM.render(
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
