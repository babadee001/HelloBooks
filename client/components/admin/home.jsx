import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AllBooks from './allBooks';
// import AddBook from './addBook';
import { getBooks, deleteBook } from '../../actions/booksActions';
import { logout } from '../../actions/authActions';
import AdminSideBar from './adminSideBar';
import { Navbar } from '../navbar';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
  }
  componentDidMount() {
    this
      .props
      .actions
      .getBooks();
  }

  logout(event) {
    event.preventDefault();

    this
      .props
      .actions
      .logout();
    window.location.href = '/';
  }

  handleClick(bookId) {
    swal({ title: 'Are you sure?', text: 'Once deleted, you will not be able to recover it back!', icon: 'warning', buttons: true, dangerMode: true }).then((willDelete) => {
      if (willDelete) {
        deleteBook(bookId).then((res) => {
          swal(res, { icon: 'success' });
        });
      } else {
        swal('Book not deleted!');
      }
    });
  }

  renderBooks() {
    const { username } = this.props.user;
    const allbooks = this.props.books;
    if (!allbooks) {
      return (<div
        style={{
          backgroundColor: '#fff',
          float: 'right',
          marginLeft: '-100px',
          marginRight: '-50px'
        }}
      >
        <h2>There is no book in the database</h2>
      </div>);
    }

    return (
      <div className="row">
        <AdminSideBar fullname={ this.props.user.username } />

        <div className="col s12 l9" id="list_boy">
          {allbooks.map(book => (<AllBooks
            key={ book.id }
            prodYear={ book.prodYear }
            total={ book.total }
            isbn={ book.isbn }
            author={ book.author }
            description={ book.description }
            id={ book.id }
            title={ book.title }
            cover={ book.cover }
          />))
          }
        </div>
      </div>

    );
  }
  render() {
    const { username, id } = this.props.user;
    return (
      <div>
        {this.renderBooks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.data,
    user: state.auth.user.currentUser };
}

AdminHome.PropTypes = {
  books: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBooks,
      logout
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
