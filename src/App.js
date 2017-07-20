/**
 * App.js
 *
 * This is the entry file for the application, only setup and boilerplate code.
 */

// Needed for redux-saga es6 generator support
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

// Import root app
import AppWrapper from './containers/AppWrapper';
import appWrapperSagas from './containers/AppWrapper/sagas';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from './containers/AppWrapper/selectors';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import configuration for redux store
import configureStore from './global/store';

// Import i18n messages
import { translationMessages } from './global/i18n';

// Import CSS reset and Global Styles
import './App.css';

// Import routes
import createRoutes from './global/routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: AppWrapper,
  childRoutes: createRoutes(store),
};

// Inject default app sagas
appWrapperSagas.map(store.runSaga);

// Method to render the app with translation messages
const renderApp = (messages, targetElement) => {
  ReactDOM.render(
    <div className="App">
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <Router
            history={history}
            routes={rootRoute}
            render={
              // Scroll to top when going to a new page, imitating default browser behaviour
              applyRouterMiddleware(useScroll())
            }
          />
        </LanguageProvider>
      </Provider>
    </div>,
    targetElement
  );
};


const render = (targetElement) => {
  // Hot reloadable translation json files
  if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept('./global/i18n', () => {
      renderApp(translationMessages, targetElement);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    (new Promise((resolve) => {
      resolve(import('intl'));
    }))
      .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
      ]))
      .then(() => renderApp(translationMessages, targetElement))
      .catch((err) => {
        throw err;
      });
  } else {
    renderApp(translationMessages, targetElement);
  }
};

export default render;
