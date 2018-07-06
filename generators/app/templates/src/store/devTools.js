// @flow
const defaultDevTool = arg => arg;

function getDevTools() {
  if (process.env.ON_SERVER === false || process.env.NODE_ENV !== 'production' || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || !window.devToolsExtension) {
    return defaultDevTool;
  }

  return window.devToolsExtension({
    actionSanitizer: action => {
      const type = String(action.type);

      return { ...action, type };
    },
  });
}

export const devTools = getDevTools();