import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';

import SigninForm from '../forms/signinForm';
import { userSigninRequest } from '../../actions/authActions';

class Signin extends Component {
  render() {
    const { userSigninRequest } = this.props;
    return (
      <div>
        <Navbar />
        <SigninForm userSigninRequest={ userSigninRequest } />
      </div>
    );
  }
}

Signin.propTypes = {
  userSigninRequest: React.PropTypes.func.isRequired,
};

export default connect(state => ({}), { userSigninRequest })(Signin);
