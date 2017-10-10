import React, { Component } from 'react';
// import { Col, Input, Button } from 'react-materialize';

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
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
        <h3 className='text-center'>Sign in</h3>
        <div className='form-group label-floating'>
          
          <label className='control-label'>Email</label>
          <input type='text' name='email' className='form-control' value={this.state.email} onChange={this.onChange} />

          <label className='control-label'>Password</label>
          <input type='text' name='password' className='form-control' value={this.state.password} onChange={this.onChange} />
        </div>
        <div className="form-group text-center">    
          <button type="button" id="" className="btn btn-block btn-raised darkBtn"> Sign in</button>

        <p>Forgot Password? <a href="#">Reset Passsword.</a></p>
        <p>Do not have an account? <a href="signup"> Sign up </a></p> 
    </div>
      </form>
    );
  }
}




                