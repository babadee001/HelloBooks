import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../navbar';
import SideBar from '../includes/sidebar';
import { bindActionCreators } from 'redux';
import { editProfile } from '../../actions/authActions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.user.username,
      email: this.props.user.email,
      edit: false,
      profile: true
    };

    this.onChange = this
      .onChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.displayEdit = this
      .displayEdit
      .bind(this);
  }

  onChange(e) {
    const name = e.target.name,
      value = e.target.value;
    this.setState({ [name]: value });
  }

  displayEdit(e) {
    this.setState({ edit: true, profile: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    editProfile(this.props.user.userId, this.state).then((res) => {
      localStorage.setItem('token', res);
      // Materialize.toast('Profile edited Successfully', 2000, 'blue darken-4', () => {
      //   window.location.href = '/profile';
      // });
    });
  }

  render() {
    const { username, id, email, membership } = this.props.user;
    return (
      <div className="row">
        <Navbar link2="All books" link3="Logout" />
        <div className="profile-usermenu col-md-3">
          <ul className="nav">
            <li className="active">
              <a href="">
                <i className="glyphicon glyphicon-home" />
							Overview </a>
            </li>
            <li>
              <a href="">
                <i className="glyphicon glyphicon-user" />
							Account Settings </a>
            </li>
            <li>
              <a href="" target="_blank">
                <i className="glyphicon glyphicon-ok" />
							Edit profile </a>
            </li>
            <li>
              <a href="">
                <i className="glyphicon glyphicon-flag" />
							Contact Admin </a>
            </li>
          </ul>
        </div>
        {/* <!-- END MENU --> */}
        <div className="col-md-9">
          <div className="profile-content">
            Contents Go here
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editProfile
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return { user: state.auth.user.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
