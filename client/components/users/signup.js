import React, { Component } from 'react';

import SignupForm from '../forms/signupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';

class Signup extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect((state) => { return {} },{ userSignupRequest })(Signup);
