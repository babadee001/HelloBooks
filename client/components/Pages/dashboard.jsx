import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import AllBooks from '../includes/books';
import SideBar from '../includes/sidebar';
import Navbar from '../navbar';
import sidebar from '../includes/sidebar';

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
    if (!allbooks || allbooks.length === 0) {
      return (
      <div>
        <SideBar
        fullname={ this.props.user.username }
        link1={'Borrow History'} 
        route1={'/history'}
        link2={'All books'} 
        route2={'/dashboard'}
        link3={'Profile'} 
        route3={'/profile'}
        /> 
        {this.props.isFetching ? <div className="preloader"></div> :
        <div className="container">
        <div className="row card-wrapper">
          <div className="card-deck col-md-offset-3">
            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <p className="card-text">No books available in the store now, please check later</p>
              </div>
            </div>
          </div>
        </div>
  </div>}
      </div>
      );
    }else{
    return (
      <div className="">
        <div className="row">
          <div className="card-panel headcard">
            <center>Recently Added</center>
          </div>
          <SideBar 
          fullname={ this.props.user.username }
          link1={'Borrow History'} 
          route1={'/history'}
          link2={'All books'} 
          route2={'/dashboard'}
          link3={'Profile'} 
          route3={'/profile'}
          /> 
          <div className="col s12 l9">
          {allbooks.map(book => (<AllBooks
            key={ book.id }
            author={ book.author }
            borrowed={false}
            description={ book.description }
            id={ book.id }
            userId={ this.props.user.userId || this.props.user.id }
            title={ book.title }
            cover={ book.cover }
          />))
          }
      </div>
      </div>
    </div>
    )}
  }

  render() {
    return (
      <div>
        <Navbar route='/about' link='About' route1="/profile" link1="Profile" route2="" link2="Contact Us" />
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
  return { 
    user: state.auth.user.currentUser,
    books: state.books.data,
    isFetching: state.books.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBooks
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
