import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';

import SignupForm from '../forms/SignupForm';
import userSignupRequest from '../../actions/AuthActions';

class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <Navbar />
        <SignupForm userSignupRequest={ userSignupRequest } />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(state => ({}), { userSignupRequest })(Signup);
