import React, { Component } from 'react';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      membership: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state).then(() => {
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
          Materialize.toast('Signed up Successfully', 1000,
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
        <div className="container-fluid game-screen">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 authenticationWrapper">
              <div className="authenticationBox">
                <h4>SIGN UP</h4>
                <form className="glyphicon" onSubmit={ this.onSubmit }>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-lock" />
                    </span>
                    <input
                      className="form-control" value={ this.state.username } onChange={ this.onChange } type="text" name="username"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      className="form-control" value={ this.state.email } onChange={ this.onChange } type="email" name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-lock" />
                    </span>
                    <input
                      className="form-control" value={ this.state.password } onChange={ this.onChange } type="password" name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-lock" />
                    </span>
                    <input className="form-control" type="password" name="confirmpassword" placeholder="Confirm password" required />
                  </div>
                  <label className="control-label">Membership</label>
                  <select className="form-control" name="membership" onChange={ this.onChange } value={ this.state.membership } >
                    <option value="" disabled>Choose your membership</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                  </select>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block btn-cfh-green">Sign up</button>
                  </div>
                  <div className="form-group text-center">
                  Have an account?
                    <Link to="signin">Sign in</Link>
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
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};
SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

