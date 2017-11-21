import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBorrowed } from '../../actions/booksActions';
import AllBorrowed from '../includes/BorrowedBooks';
import Navbar from '../navbar';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
  }
  componentDidMount() {
    this
      .props
      .actions
      .getBorrowed(this.props.user.userId);
  }

  renderBooks() {
    const allBorrowed = this.props.book;
    if (!allBorrowed) {
      return (<div className="empty-notifier">
        <h2>Wawu!!!...You have no borrowing history.</h2>
      </div>);
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-panel">
            <center>Borrowing History</center>
          </div>
          {allBorrowed.map(book => (<AllBorrowed
            key={ book.id }
            author={ book.author }
            description={ book.description }
            id={ book.id }
            userId={ this.props.user.userId }
            title={ book.title }
            cover={ book.cover }
          />))
          }
        </div>
      </div>
    );
  }

  render() {
    const { username, id, email, membership } = this.props.user;
    return (
      <div className="row">
        <Navbar link2="All books" link3="Logout" />
        <div className="profile-usermenu col-md-3">
          <ul className="nav">
            <li className="active">
              <a href="/dashboard">
                <i className="glyphicon glyphicon-home" />
							View All Books </a>
            </li>
            <li>
              <a href="/history">
                <i className="glyphicon glyphicon-user" />
							Borrowing history </a>
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
            {this.renderBooks()}
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
    book: state.books.allBorrowedBooks };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBorrowed
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
