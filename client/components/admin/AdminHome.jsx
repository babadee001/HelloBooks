import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import AllBooks from './allBooks';
import { getBooks, deleteBook } from '../../actions/BooksActions';
import { logout, getUsers } from '../../actions/AuthActions';
import AdminSideBar from '../includes/SideBar';
import Navbar from '../NavigationBar';

/**
 * AdminHome component
 * 
 * @export { Object }
 * 
 * @class AdminHome
 * 
 * @extends {Component}
 */
class AdminHome extends Component {

  /**
	 * @description - Creates an instance of AdminHome.
	 * 
	 * @param {Object} props - Componnet props data
	 * 
	 * @memberOf AdminHome
	 */
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
  }

  /**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AdminHome
	 */
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

  /**
	 * @description - Unauthenticates user
	 * 
	 * @memberOf AdminHome
	 */
  logout(event) {
    event.preventDefault();

    this
      .props
      .actions
      .logout();
    browserHistory.push('/');
  }

  /**
	 * 
	 * @description - Displays the list of books in library
	 * 
	 * @returns {Array} - Array of books
	 * 
	 * @memberOf AdminHome
	 */
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
          link2={'View Logs'} 
          route2={'/logs'}
          link3={'Profile'} 
          route3={'/adminprofile'}
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

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf AdminHome
	 */
  render() {
    const { username, id } = this.props.user;
    return (
      <div>
        <Navbar route="/add" link="Add Book" route1="/adminprofile" link1="Profile" />
        {this.renderBooks()}
      </div>
    );
  }
}

/**
 * @description - Maps the redux state to the component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
  return { books: state.books.data,
    user: state.auth.user };
}

AdminHome.PropTypes = {
  books: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

/**
 * 
 * @description - Maps the dispatch to component props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBooks,
      getUsers,
      logout
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
