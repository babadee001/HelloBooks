import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from '../forms/signupForm';
import userSignupRequest from '../../actions/signupActions';

class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <SignupForm userSignupRequest={ userSignupRequest } />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default connect(state => ({}), { userSignupRequest })(Signup);
