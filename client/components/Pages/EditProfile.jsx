import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../NavigationBar';
import Sidebar from '../includes/SideBar';
import { checkUser } from '../../utils/validations';
import { editProfileAction } from '../../actions/AuthActions';
  
/**
 * @description - Edit profile component
 * 
 * @class EditProfile
 * 
 * @extends {Component}
 */
class EditProfile extends Component {
	/**
	 * @description - Creates an instance of EditProfile.
	 * 
	 * @param {Object} props - Component properties
	 * 
	 * @memberOf EditProfile
	 */
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.user.username,
			edit: false,
			emailExist: '',
			profile: true,
			usernameError: '',
			oldPassword: '',
			newPassword: ''
		};

		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	/**
   * Validates the user input
   * 
   * @param {Object} event 
	 * 
   * @returns {Object}
   * 
   * @memberOf Profile
   */
	onBlur(event) { ` `
		const name = event.target.name;
		const value = event.target.value;

		switch (name) {
			case 'username':
				const validator = /[A-Za-z]/g;
				if (!validator.test(value)) {
					this.setState({
						usernameError: 'Invalid input, username cannot be letters only or empty'
					});
					return false;
				}
				break;
		}
	}

	/**
   * @description - Clears error from application local state
   * 
   * @param {Object} event 
   * 
   * @memberOf Profile
   */
	onFocus(event) {
		const name = event.target.name;
		const value = event.target.value;

		switch (name) {
			case 'username':
				this.setState({ usernameError: '' });
				break;
			case 'email':
				this.setState({ emailExist: '' });
				break;
		}
  }
  
  	/**
   * @description - Submits user input
   * 
   * @param {Object} event 
   * 
   * @memberOf EditProfile
   */
  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.user.userId || this.props.user.id;
    checkUser({searchTerm: this.state.username})
    .then((response) => {
        if (response !== 'Not found') {
          this.setState({ usernameError: 'username exists' });
          return false;
        } else {
          this.props.actions.editProfileAction(userId, this.state);
        }
    })
	}

	/**
   * @description - set user input to state
   * 
   * @param {Object} event 
   * 
   * @memberOf Profile
   */
	onChange(event) {
		const name = event.target.name;
		const	value = event.target.value;
		this.setState({ [name]: value });
	}
	render() {
		return (
      <div>
        <Navbar route="/dashboard" link="All books" route1="/history" link1="History" />
        <Sidebar
            link1={'Borrow History'} 
            route1={'/history'}
            link2={'All books'} 
            route2={'/dashboard'}
            link3={'Profile'} 
            route3={'/profile'}
            />
            
            <form className="col-md-offset-3" name="edit_profile" id="edit_profile" 
								onSubmit={this.handleSubmit}>
								<div className="edit-profile">
									<div className="row">
										<div className="input-field col s12">
											<b>Username</b>
											<input
                        id="username"
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
												onChange={this.onChange}
												type="text"
												name="username"
												className="validate"
												defaultValue={this.state.username}
											/>
                      <div className="red-text">{this.state.usernameError}</div>
										</div>
									</div>
							<div className="center red-text">
							(Leave blank unless you want to change your password)</div>
									<div className="row">
										<div className="input-field col s6">
											<b>Old Password</b>
											<input
												id="oldPassword"
												type="password"
												name="oldPassword"
												className="validate"
												onBlur={this.onBlur}
												onFocus={this.onFocus}
												onChange={this.onChange}
											/>
										</div>

										<div className="input-field col s6">
											<b>New Password</b>
											<input
												id="newPassword"
												type="password"
												name="newPassword"
												className="validate"
												onBlur={this.onBlur}
												onFocus={this.onFocus}
												onChange={this.onChange}
											/>
										</div>
									</div>
								</div>
                <p id="message">
                Please note. You will be logged out and be required to login again with the new details
                </p>
								<button id="editbutton"
									className="btn waves-effect"
									type="submit"
									name="submit"
								disabled={this.state.usernameError.length > 1 }
                >
									Submit
								</button>
							</form>
      </div>
    )
	}
}

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
  return { 
    user: state.auth.user.currentUser
  };
}

/**
 * @description - Maps the dispatch to component props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editProfileAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
