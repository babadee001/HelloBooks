import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';

import { logout } from '../../actions/authActions';

export default function (ComposedComponent) {
  class AdminAuthentication extends Component {
    componentWillMount() {
      const key = 'babadee';

      const token = localStorage.getItem('token');
      if (token) {
        jwt.verify(token, key, (error) => {
          if (error) {
            // this
            //   .props
            //   .actions;
            //   .logout();
            window.location.href = '/dashboard';
          }
        });
      }
      if (!this.props.authenticated) {
        this
          .props
          .actions
          .logout();
        window.location.href = '/';
      }

      if (this.props.user.isAdmin !== 1) {
        window.location.href = '/dashboard';
      }
    }

    // componentWillUpdate(nextProps) {
    //   if (nextProps.currentUser.isAdmin !== 1) {
    //     window.location.href = '/';
    //   }
    // }

    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }
  AdminAuthentication.PropTypes = {
    router: PropTypes.object
  };

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        logout
      }, dispatch)
    };
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user.currentUser };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AdminAuthentication);
}
