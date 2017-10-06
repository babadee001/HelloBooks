import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, NavItem } from 'react-materialize';
import { Link } from 'react-router';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <Navbar className='teal' brand='Hello-books' right>
          <NavItem href='/'>Home</NavItem>
          <NavItem href='/signup'>About</NavItem>
        </Navbar>
      </div>
    );
  }
}
