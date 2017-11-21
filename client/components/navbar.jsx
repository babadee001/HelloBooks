import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="teal">
          <div className="nav-wrapper">
            <a href="" className="">Hello-books</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <div className="navitems">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/profile">{this.props.link1}</a></li>
                <li><a href="/dashboard">{this.props.link2}</a></li>
                <li><a href="/logout">{this.props.link3}</a></li>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
