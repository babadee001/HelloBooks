import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';

import SignupForm from '../forms/signupForm';
import { userSignupRequest } from '../../actions/authActions';

/**
 * @description - Signup component
 * 
 * @export {Object} Signup component
 * 
 * @class Signup
 * 
 * @extends {Component}
 */
class Signup extends Component {

  /**
	 * @description - Renders the component
	 * 
	 * @returns { Object }
	 * 
	 * @memberOf Signin
	 */
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
