import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import AllBooks from './allBooks';
import { getBooks, deleteBook } from '../../actions/booksActions';
import { logout } from '../../actions/authActions';
import AdminSideBar from '../includes/sidebar';
import Navbar from '../navbar';
import { getUsers } from '../../actions/authActions';

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
      this
      .props
      .actions
      .getUsers();
  }

  logout(event) {
    event.preventDefault();

    this
      .props
      .actions
      .logout();
    browserHistory.push('/');
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
      <div className="container">
        <div className="card-panel headcard">
            <center>Available Books</center>
          </div>
        <div className="row">
          <AdminSideBar 
          fullname={ this.props.user.username }
          link1={'Add New Book'} 
          route1={'/add'}
          link2={'Profile'} 
          route2={'/profile'}
          link3={'Logs'} 
          route3={'/logs'}
          />
          <div className="col s12 l9" id="list_boy">
            {allbooks.map(book => (<AllBooks
              deleteBook={ deleteBook }
              key={ book.id }
              prodYear={ book.prodYear }
              total={ book.quantity }
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
      </div>

    );
  }
  render() {
    const { username, id } = this.props.user;
    return (
      <div>
        <Navbar route="/admin" link="Admin dashboard" route1="/logs" link1="View Logs" />
        {this.renderBooks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.data,
    user: state.auth.user };
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
