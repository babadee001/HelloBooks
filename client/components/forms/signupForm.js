import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
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
      <form onSubmit={this.onSubmit}>
        <h3 className='text-center'>Signup</h3>
        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input type='text' name='username' className='form-control' value={this.state.username} onChange={this.onChange} />

          <label className='control-label'>Email</label>
          <input type='text' name='email' className='form-control' value={this.state.email} onChange={this.onChange} />

          <label className='control-label'>Password</label>
          <input type='password' name='password' className='form-control' value={this.state.password} onChange={this.onChange} />

          <label className='control-label'>Membership</label>
          <select className='form-control' name='membership' onChange={this.onChange} value={this.state.membership} >
            <option value='' disabled>Choose your membership</option>
            <option value='Gold'>Gold</option>
            <option value='Silver'>Silver</option>
            <option value='Bronze'>Bronze</option>
            </select>
        </div>
        <div className="form-group text-center">    
        <button type="button" id="" className="btn btn-block btn-raised darkBtn"> Sign up</button>
        </div>
      </form>
    );
  }
}
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};
SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

