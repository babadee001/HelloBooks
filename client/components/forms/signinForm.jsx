import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { checkExisting } from '../../utils/validations';

export default class SigninForm extends Component {
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
	 * @description - Re-map API response to retrieve necessary data
	 * 
	 * @param {Object} obj - Object from Google API
	 * 
	 * @returns {Object} 
	 * 
	 * @memberOf GoogleLogIn
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
  responseGoogle(response) {
    const secret = process.env.secretKey;
    if (response.Zi.id_token) {
      const decoded = jwt.decode(response.Zi.id_token);
      const newUserObject = this.getDetails(decoded);
      checkExisting({ email: newUserObject.currentUser.email })
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
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
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
                      onFailure={this.responseGoogle}
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

