import React, { Component } from 'react';
// import classnames from 'classnames';
import validateInput from './validation/validate';

export default class Signupform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {},
        ({ data }) => this.setState({ errors: data, isLoading: false }),
      );
    }
    // console.log(this.state);
  }

  render() {
    return (
      <form className='' onSubmit={this.onSubmit}>
        <h3 className='text-center'>Signup</h3>
        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input type='text' name='username' className='form-control' value={this.state.username} onChange={this.onChange} />

          <label className='control-label'>Email</label>
          <input type='text' name='email' className='form-control' value={this.state.email} onChange={this.onChange} />

          <label className='control-label'>Password</label>
          <input type='password' name='password' className='form-control' value={this.state.password} onChange={this.onChange} />

          <label className='control-label'>Confirm password</label>
          <input type='password' name='confirmPassword' className='form-control' value={this.state.confirmPassword} onChange={this.onChange} />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary btn-lg'>Sign up </button>
        </div>
      </form>
    );
  }
}
Signupform.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};
