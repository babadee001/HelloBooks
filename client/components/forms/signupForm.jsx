import React, { Component } from 'react';
import userSignupRequest from '../../actions/signupActions';

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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {
        this.context.router.push('/');
      },
    );
    console.log(this.state);
  }
  render() {
    // const options = {'Gold', 'Silver', 'Bronze'};
    return (
      <div className="container-fluid game-screen">
      <div className="row">
        <div className="col-md-4 col-md-offset-4 authenticationWrapper">
          <div className="authenticationBox">
            <h4>SIGNUP</h4>
            <form className="glyphicon" onSubmit={this.onSubmit}>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock" />
                </span>
                <input
                  className="form-control" value={this.state.username} onChange={this.onChange} type="text" name="username" placeholder="Username"
                  required
                />
              </div>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <input
                  className="form-control" value={this.state.email} onChange={this.onChange} type="email" name="email" placeholder="Email"
                  required
                />
              </div>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock" />
                </span>
                <input
                  className="form-control" value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder="Password"
                  required
                />
              </div>
              <div className="form-group input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock" />
                </span>
                <input className="form-control" type="password" name="confirmpassword" placeholder="Confirm password" required />
              </div>
              <label className='control-label'>Membership</label>
              <select className='form-control' name='membership' onChange={this.onChange} value={this.state.membership} >
              <option value='' disabled>Choose your membership</option>
              <option value='Gold'>Gold</option>
              <option value='Silver'>Silver</option>
              <option value='Bronze'>Bronze</option>
              </select>
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-block btn-cfh-green">Signup</button>
              </div>
              <div className="form-group text-center">
                Have an account?
                <a href="signin">Sign in</a>
              </div>
            </form>
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

