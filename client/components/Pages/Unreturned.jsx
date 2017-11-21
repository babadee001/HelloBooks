import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getHistory } from '../../actions/booksActions';
import AllBorrowed from '../includes/BorrowedBooks';
import Navbar from '../navbar';

class Dashboard extends Component {
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
      .getHistory(this.props.user.userId);
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
    return (
      <div>
        <Navbar link2="Logout" link1="Profile" />
        {this.renderBooks()}
      </div>
    );
  }
}

Dashboard.PropTypes = {
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
      getHistory
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
