// @flow
import { compose } from 'redux';


/* eslint-disable no-underscore-dangle */
function getComposeEnhancers() {
  if (process.env.ON_SERVER !== false || process.env.NODE_ENV === 'production' || !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return compose;
  }

  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: true,
    actionSanitizer: action => {
      const type = String(action.type);

      return { ...action, type };
      },
  });
}

export const composeEnhancers = getComposeEnhancers();