import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import 'react-dates/initialize';
import './index.css';
import 'react-dates/lib/css/_datepicker.css';

const root = document.getElementById('root');

const renderApp = (RootComponent, store) => {
  render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    root,
  );
};

// render app to the dom
const { store, history } = configureStore();

renderApp(Root, store, history);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot, store, history);
  });
}
