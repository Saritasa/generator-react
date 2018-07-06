// @flow
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux-immutable';

import { entityStore } from './entityStore';
import { lazyTransformToJS } from './lazyTransformToJS';
import { composeEnhancers } from "./composeEnchancers";
import { devTools } from "./devTools";

const mainReducer = combineReducers({
  entity: entityStore.reducer,
});

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: () => process.env.NODE_ENV !== 'production',
  stateTransformer: lazyTransformToJS,
  actionTransformer: action => Object.assign({}, action, { type: String(action.type) }),
});
const createStoreWithMiddleware = function configureStore(reducer, initialState) {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger), devTools),
  );
};

export function configureStore(initialState) {
  const store = createStoreWithMiddleware(mainReducer, initialState);

  if (module.hot) {
    const { hot } = module;

    // Enable Webpack hot module replacement for reducers
    hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default; // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
