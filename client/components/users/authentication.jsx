import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authActions';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const key = 'babadee';
      const token = localStorage.getItem('token');
      if (token) {
        jwt.verify(token, key, (error) => {
          if (error) {
            window.location.href = '/';
          }
        });
      }
      if (!this.props.authenticated) {
        window.location.href = '/';
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        window.location.href = '/';
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        logout
      }, dispatch)
    };
  }

  Authentication.PropTypes = {
    router: PropTypes.object
  };

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
