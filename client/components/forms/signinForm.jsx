import React, { Component } from 'react';
import { userSigninRequest } from '../../actions/authActions';

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.userSigninRequest(this.state).then(
      () => {
        window.location.href = '/admin';
      },
    );
    console.log(this.state);
  }
  render() {
    return (
      <div className="background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-md-offset-4 authenticationWrapper">
              <div className="authenticationBox">
                <h4 className="text-center">SIGN IN</h4>
                <form className="glyphicon" onSubmit={this.onSubmit}>
                  <div className="form-group input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-user" />
                    </span>
                    <input
                      className="form-control" value={this.state.username} onChange={this.onChange} type="text"
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
                      className="form-control" value={this.state.password} onChange={this.onChange} type="password"
                      name="password" placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-success btn-block">Sign in</button>
                  </div>
                  <div className="form-group text-center">
                  Don't have an account?
                    <a href="signup">Sign up</a>
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
};
SigninForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

