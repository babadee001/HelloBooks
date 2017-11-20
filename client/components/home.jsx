import React, { Component } from 'react';
import '../style/style.scss';
// import { Slider, Slide } from 'react-materialize';

export default class Home extends Component {
  render() {
    return (
      <div className="background container-fluid">
        <div className="row row-centered">
          <div className="col-md-6 col-centered">
            <h1>Welcome to Hello-Books</h1>
            <a href="/signup" className="waves-effect waves-light btn">Signup</a>
            <a href="/signin" className="waves-effect waves-light btn">Signin</a>
          </div>
        </div>
      </div>
    );
  }
}
