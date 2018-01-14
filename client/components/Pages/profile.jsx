import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBorrowed } from '../../actions/booksActions';
import AllBorrowed from '../includes/Unreturned';
import Sidebar from '../includes/sidebar';
import Navbar from '../navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = this.props.user.userId
    this
      .props
      .actions
      .getBorrowed(userId);
  }

  render() {
    const { username, email, membership } = this.props.user;
    console.log(this.props.book.length);
    return (
      <div>
        <Navbar route1="/dashboard" link1="All books" route2="" link2="Contact Us" />
        <div className="row">
          <Sidebar 
          fullname={ this.props.user.username }
          link1={'Borrow History'} 
          route1={'/history'}
          link2={'All books'} 
          route2={'/dashboard'}
          link3={'Profile'} 
          route3={'/profile'}
          />
          <div className="container">
        <div className="row card-wrapper about">
          <div className="card-deck col-md-offset-3">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <div className="card-text">
                <div className="records">
                  <p><span>Username ====></span> {this.props.user.username}</p>
                  <p><span>Email ====></span> {this.props.user.email}</p>
                  <p><span>Membership ====></span> {this.props.user.membership}</p>
                  <p><span>Number of Unreturned Books ====> {this.props.book.length} </span> {}</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    );
  }
}

Profile.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.auth.user.currentUser,
    book: state.books.allUnreturnedBooks };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBorrowed
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
