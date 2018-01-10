import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsers } from '../../actions/authActions';
import { getAllBorrowed } from '../../actions/booksActions';
import Navbar from '../navbar';


class Logs extends Component {
  constructor(props) {
    super(props);
  }
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
  renderProps(){
    const books = this.props.books;
    const auth = this.props.auth;
    console.log(this.props)
    return (
      <div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderProps()}
        <Navbar route1="/admin" link1="Admin dashboard" route2="" link2="Contact Us" />
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
 *
 *
 * @param {Object} state
 *
 * @returns {Object} Object containing the application state
 */
function mapStateToProps(state) {
  return {
    books: state.books,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllBorrowed,      
      getUsers
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);
