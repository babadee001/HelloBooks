import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, NavItem } from 'react-materialize';
import { logout } from '../actions/authActions'; 

/**
 * @description - Navbar component
 * 
 * @export {Object}
 * 
 * @class Navbar
 * 
 * @extends {Component}
 */
class Nav extends Component {

  /**
	 * 
	 * @description - Logout user out of the app
	 * 
	 * @memberOf Navbar
	 */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Navbar
	 */
  render() {
    const isAuthenticated = this.props.auth.authenticated;
    
    return (
      <div className="Navwrapper">
        {isAuthenticated?
        (
          <Navbar brand='Hello-Books' fixed right>
            <NavItem><Link to='/dashboard'>Home</Link></NavItem>
            <NavItem><Link to={this.props.route}>{this.props.link}</Link></NavItem>
            <NavItem><Link to={this.props.route1}>{this.props.link1}</Link></NavItem>
            <NavItem><Link onClick={ this.logout.bind(this) }>Logout</Link></NavItem>
          </Navbar>
        ):
        (
          <Navbar brand='Hello-Books' right fixed>
            <NavItem><Link to='/'>Home</Link></NavItem>
            <NavItem><Link to='/about'>About</Link></NavItem>
            <NavItem href='https://github.com/babadee001/HelloBooks#readme' target="_blank">Check on Github</NavItem>
          </Navbar>
        )
        }
        
      </div>
    );
  }
}
Nav.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Nav);
