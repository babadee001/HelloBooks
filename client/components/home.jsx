import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './navbar';
import '../style/style.scss';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Nav route1="/profile" link1="Profile" route2="/dashboard" link2="All books" />
        <div className="background container-fluid">
          <div className="row row-centered">
            <div className="col-md-6 col-centered">
              <h1>Welcome to Hello-Books</h1>
              <Link to="/signup" className="waves-effect waves-light btn">Signup</Link>
              <Link to="/signin" className="waves-effect waves-light btn">Signin</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
