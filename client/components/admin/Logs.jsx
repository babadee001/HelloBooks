import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from '../../actions/AuthActions';
import { getAllBorrowed } from '../../actions/BooksActions';
import Navbar from '../NavigationBar';

/**
 * Logs component
 * 
 * @export { Object }
 * 
 * @class Logs
 * 
 * @extends {Component}
 */
class Logs extends Component {
  constructor(props) {
    super(props);
  }

  /**
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AdminHome
	 */
  componentDidMount() {
    this
      .props
      .actions
      .getUsers();
      this
        .props
        .actions
        .getAllBorrowed();
  }
  
  /**
	 * @description - Renders props of the component
	 * 
	 * @memberOf Logs
	 */
  renderProps(){
    const books = this.props.books;
    const auth = this.props.auth;
    return (
      <div>
      </div>
    )
  }

  /**
	 * 
	 * @description - Renders the component
	 * 
	 * @returns {Object} - Object
	 * 
	 * @memberOf Logs
	 */
  render() {
    return (
      <div>
        {this.renderProps()}
        <Navbar route="/admin" link="Admin dashboard" route1="/add" link1="Add New" />
        <div className="container">
        <div className="row card-wrapper">
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Available Books</h5>
                          <p className="card-text">{this.props.books.data.length}</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Registered Users</h5>
                          <p className="card-text">{this.props.auth.data.length}</p>
                        </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="card text-white bg-info mb-3 col cardbox">
                        <div className="card-body">
                          <h5 className="card-title">All Books Borrowed</h5>
                          <p className="card-text">{this.props.books.allTimeBorrowed.length}</p>
                        </div>
                    </div>
                  </div>
                </div>
      </div>
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
  return {
    books: state.books,
    auth: state.auth
  };
}

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
      getAllBorrowed,      
      getUsers
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);
