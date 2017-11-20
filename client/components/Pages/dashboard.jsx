import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import AllBooks from '../includes/books';
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
      .getBooks();
  }

  renderBooks() {
    const allbooks = this.props.books;
    if (!allbooks) {
      return (<div className="empty-notifier">
        <h2>Wawu!!!...No book available at this time.</h2>
      </div>);
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-panel">
            <center>Recently Added</center>
          </div>
          {allbooks.map(book => (<AllBooks
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
    books: state.books.data };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBooks
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
