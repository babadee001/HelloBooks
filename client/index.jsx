import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import setAuthorizationToken from './utils/setAuthorization';
// import './style/style.scss';

import routes from './routes';
import Style from './style/style.scss';

setAuthorizationToken(localStorage.Token);

const store = configureStore();
render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('container')
);
