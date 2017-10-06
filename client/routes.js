import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/home';
import Signup from './components/users/signup';
import Signin from './components/users/signin';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path='/signin' component={Signin} />
    </Route>
)
