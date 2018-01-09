import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Signup from './components/users/Signup';
import Signin from './components/users/Signin';
import Profile from './components/Pages/Profile';
import AddBook from './components/admin/AddBook';
import Dashboard from './components/Pages/Dashboard';
import Authentication from './components/users/authentication';
import AdminAuthentication from './components/users/adminAuthentication';
import Admin from './components/admin/Home';
import BorrowedBooks from './components/Pages/History';
import NotFound from './components/Pages/NotFound';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="/signup" component={ Signup } />
    <Route path="/signin" component={ Signin } />
    <Route path="/profile" component={ Authentication(Profile) } />
    <Route path="/add" component={ AdminAuthentication(AddBook) } />
    <Route path="/admin" component={ AdminAuthentication(Admin) } />
    <Route path="/dashboard" component={ Authentication(Dashboard) } />
    <Route path="/history" component={ Authentication(BorrowedBooks) } />
    <Route path="*" component={NotFound} />
  </Route>
);
