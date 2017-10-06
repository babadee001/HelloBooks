import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import App from './components/app';

render (
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('container')
);
