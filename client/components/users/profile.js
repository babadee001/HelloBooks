import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col, Input, Button , SideNav, SideNavItem} from 'react-materialize';

export default class Signup extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       email: ''
//     }
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }
//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
//   onSubmit(e) {
//     e.preventDefault();
//     // console.log(this.state);
//   }
  render() {
    return (
        <div>
            <div className="side-bar">
                <ul className="nav nav-pills nav-stacked">
                <li role="presentation" className="active">
                    <Link to="/#"><i className="glyphicon glyphicon-th" />
                    <span className="nav-item">Borrowing history</span>
                    </Link>
                </li>
                <li role="presentation">
                    <a href="#"><i className="glyphicon glyphicon-bell not-active" />
                    <span className="nav-item not-active">Contact Admin</span>
                    </a>
                </li>
                <li role="presentation">
                    <a href="#"><i className="glyphicon glyphicon-cog not-active" />
                    <span className="nav-item not-active">Account Settings</span>
                    </a>
                </li>
                </ul>
            </div>
            <h1>Contents...</h1>
        </div>
    );
  }
}
