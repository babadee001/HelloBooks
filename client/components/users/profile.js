import React, { Component } from 'react';
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
        <div className="row profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
						Andela Baby
					</div>
					<div className="profile-usertitle-job">
						Developer
					</div>
				</div>
				<div className="profile-userbuttons">
					<button type="button" className="btn btn-primary btn-sm">Borrowing history</button>
					<button type="button" className="btn btn-primary btn-sm">Active books</button>
				</div>
				<div className="profile-usermenu">
					<ul className="nav">
						<li className="active">
							<a href="#">
							<i className="glyphicon glyphicon-home"></i>
							Overview </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-user"></i>
							Account Settings </a>
						</li>
						<li>
							<a href="#" target="_blank">
							<i className="glyphicon glyphicon-ok"></i>
							Notifications </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-flag"></i>
							Help </a>
						</li>
					</ul>
				</div>
			</div>
		</div>
        </div>
    );
  }
}
