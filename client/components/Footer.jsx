import React, { Component } from 'react';
import { render } from 'react-dom';

/**
 * @description - Footer
 * 
 * @export {Object}
 * 
 * @class Footer
 * 
 * @extends {Component}
 */
export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="navbar-fixed-bottom text-center">
          <em>
            <p className="fa fa-book"> Just Books!  . . . </p>
          </em>
        </footer>
      </div>
    );
  }
}
