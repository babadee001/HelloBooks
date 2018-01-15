import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';

import SigninForm from '../forms/signinForm';
import { userSigninRequest, userSignupRequest, googleSigninRequest } from '../../actions/authActions';

class Signin extends Component {
  render() {
    const { userSigninRequest, userSignupRequest, googleSigninRequest } = this.props;
    return (
      <div>
        <Navbar />
        <SigninForm 
        userSigninRequest={ userSigninRequest } 
        userSignupRequest= { userSignupRequest }
        googleSigninRequest= { googleSigninRequest }
        />
      </div>
    );
  }
}

Signin.propTypes = {
  userSigninRequest: React.PropTypes.func.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired,
  googleSigninRequest: React.PropTypes.func.isRequired
};
export default connect(state => ({}), { userSignupRequest, userSigninRequest, googleSigninRequest })(Signin);
