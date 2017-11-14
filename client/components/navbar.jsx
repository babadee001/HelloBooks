import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="teal">
          <div className="nav-wrapper">
            <a href="" className="">Hello-books</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/">Home</a></li>
              <li><a href="badges.html">About</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
