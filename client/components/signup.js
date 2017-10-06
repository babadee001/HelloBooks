import React, { Component } from 'react';
import { Col, Input, Button } from 'react-materialize';

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3 className='text-center'>Signup</h3>
        <div className='form-group'>
          <label className='control-label'>Username</label>
          <input type='text' name='username' className='form-control' value={this.state.username} onChange={this.onChange} />

          <label className='control-label'>Email</label>
          <input type='text' name='email' className='form-control' value={this.state.email} onChange={this.onChange} />

          <label className='control-label'>Password</label>
          <input type='text' name='password' className='form-control' value={this.state.password} onChange={this.onChange} />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary btn-lg'>Sign up </button>
        </div>
      </form>
    );
  }
}
