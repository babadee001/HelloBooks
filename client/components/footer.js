import React, { Component } from 'react';
import { render } from 'react-dom';
import { Footer }  from 'react-materialize';
// import Check from './components/container.js'

export default class Foot extends Component {
  render() {
    return (
      <div>
        <Footer className='teal' copyrights="All rIghts reserved 2017"
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="#!">See map</a>
        }
      >
      </Footer>
      </div>
    );
  }
}
