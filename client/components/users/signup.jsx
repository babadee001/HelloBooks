import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';

import SignupForm from '../forms/signupForm';
import { userSignupRequest } from '../../actions/authActions';

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
