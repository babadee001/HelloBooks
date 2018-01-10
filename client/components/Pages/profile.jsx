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
    if (allBorrowed.length < 1) {
      return (<div className="empty-notifier headcard">
        <h2 id="returned">Wawu!!!...All books returned.</h2>
      </div>);
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-panel headcard">
            <center>Unreturned books</center>
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
    const { username, userId, email, membership } = this.props.user;
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
          <div className="col-md-9">
            <div className="profile-content">
              {this.renderBooks()}
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
