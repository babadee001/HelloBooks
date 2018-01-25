import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { checkExisting } from '../../utils/validations';

/**
 * @description - Signin form component
 * 
 * @export {Object} SigninForm component
 * 
 * @class SigninForm
 * 
 * @extends {Component}
 */
export default class SigninForm extends Component {
  /**
	 * @description - Creates an instance of signinForm.
	 * 
	 * @param {Object} props - component properties
	 * 
	 * @memberOf signinForm
	 */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }
  /**
	 * @description - Destructure API response from google to retrieve necessary data
	 * 
	 * @param {Object} obj - Object from Google API
	 * 
	 * @returns {Object} 
	 * 
	 * @memberOf signinForm
	 */
	getDetails(obj) {
		let mainUserObject = {
			currentUser: {}
		};
		const username = obj.name.toLowerCase().replace(/[\s]/, '_')
		 + Math.round(Math.random(1998) * 56);
		mainUserObject.currentUser.username = username;
		mainUserObject.currentUser.membership = 'googleSilver';
		mainUserObject.currentUser.password = username;
		mainUserObject.currentUser.email = obj.email;
		return mainUserObject;
  }
  
  /**
	 * @description - Handles response from google signin request
	 * 
	 * @param {Object} response - Object from Google API
	 * 
	 * @returns {Object} 
	 * 
	 * @memberOf signinForm
	 */
  responseGoogle(response) {
    const secret = process.env.secretKey;
    if (response.Zi.id_token) {
      const decoded = jwt.decode(response.Zi.id_token);
      const newUserObject = this.getDetails(decoded);
      checkExisting({ searchTerm: newUserObject.currentUser.email })
      .then((res) => {
        if (res == 'Not found') {
          this.props.userSignupRequest(newUserObject.currentUser)
          .then(() => {
            Materialize.toast('Logged In Successfully', 1000,
            'teal',
            () => {
              browserHistory.push('/dashboard');
            }
          );
          });
        } else {
          let currentUser = res;
          const token = jwt.sign(
            { currentUser,
            }, secret
          );
          this.props.googleSigninRequest(token)
            Materialize.toast('Logged In Successfully', 1000,
            'teal',
            () => {
              browserHistory.push('/dashboard');
            }
          );
        }
      });
    }
  }

  /**
	 * @description - Handles the input value changes
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf signinForm
	 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
	 * @description - Submits the signin information
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf signinForm
	 */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSigninRequest(this.state).then(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const currentUser = jwt.decode(token).currentUser;
				if (currentUser.isAdmin === 1) {
          Materialize.toast('Logged In Successfully', 1000,
            'teal',
            () => {
              browserHistory.push('/admin');
            }
          );
				} else {
          Materialize.toast('Logged In Successfully', 1000,
            'teal',
            () => {
              browserHistory.push('/dashboard');
            }
          );
				}
			}
    }
    )
  }

  /**
	 * @description - Renders the component
	 * 
	 * @returns { Object }
	 * 
	 * @memberOf signinForm
	 */
  render() {
    return (
      <div className="background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 authenticationWrapper">
              <div className="authenticationBox inputStyle">
                <h4 className="text-center">SIGN IN</h4>
                <form className="glyphicon" onSubmit={ this.onSubmit }>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      className="form-control" value={ this.state.username } onChange={ this.onChange } type="text"
                      name="username"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-lock" />
                    </span>
                    <input
                      className="form-control" value={ this.state.password } onChange={ this.onChange } type="password"
                      name="password" placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-success btn-block">Sign in</button>
                  </div>
                  <GoogleLogin
                    clientId={ '555411087662-6jdfislpa3bh0l5ala6c93ht1jruv5sq.apps.googleusercontent.com' }
                      onSuccess={this.responseGoogle}
                  />
                  <div className="text-center">
                  Dont have an account?
                    <Link to="signup">Sign up</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SigninForm.propTypes = {
  userSigninRequest: React.PropTypes.func.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired
};
SigninForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

