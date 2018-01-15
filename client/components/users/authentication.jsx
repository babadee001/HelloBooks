import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
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
            this.props.actions.logout()
          }
        });
      }
      if (!this.props.authenticated) {
        this.props.actions.logout();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.actions.logout(); 
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
