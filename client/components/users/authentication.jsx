import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authActions';

dotenv.load();

/**
 *
 * Higher order component for admin authentication
 * @export {Object}
 *
 * @param {Object} ComposedComponent
 *
 * @returns {Object}
 */
export default function (ComposedComponent) {

    /**
  *
  * @memberOf Authentication
  */
  class Authentication extends Component {
    componentWillMount() {
      const key = process.env.secretKey;
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

    /**
   * Executes before component is updated
   *
   * @param {any} nextProps
   *
   * @memberOf Authentication
   */
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.actions.logout(); 
      }
    }

     /**
   * Renders the component
   *
   * @returns
   *
   * @memberOf Authentication
   */
    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

  /**
 * Maps dispatch to the application action creators
 *
 * @param {Function} dispatch
 *
 * @returns {Object} - Object containing action creators
 */
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

  /**
 *
 * @param {Function} state
 *
 * @returns {Object} - Object containing application state
 */
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, user: state.auth.user };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
