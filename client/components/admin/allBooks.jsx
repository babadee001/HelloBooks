import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import { editBook, deleteBookAction } from '../../actions/BooksActions';

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      isbn: this.props.isbn,
      author: this.props.author,
      quantity: this.props.quantity,
      currentBook: {},
      edit: false,
      displayBook: true
    };
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleFormSubmit = this
      .handleFormSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.onClick = this
      .onClick
      .bind(this);
    this.changeView = this
      .changeView
      .bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onClick() {
    this.setState({ displayBook: false, edit: true });
  }

  handleClick() {
    swal({ title: 'Are you sure?',
      text: 'This is permanent!',
      icon: 'warning',
      buttons: true,
      dangerMode: true })
      .then((Delete) => {
        if (Delete) {
          deleteBookAction(this.props.id)
            .then((res) => {
              swal(res, { icon: 'success' });
            });
        } else {
          swal('Book was not deleted');
        }
      });
  }

  changeView() {
    this.setState({ displayBook: true, edit: false });
  }
  handleFormSubmit(event) {
    event.preventDefault();
    editBook(this.state, this.props.id).then((res) => {
      Materialize.toast(res, 1000, 'blue', () => {
        this.setState({ displayBook: true, edit: false });
      });
    });
  }

  render() {
    return (
      <div className="col s12 m3 l3">
        {this.state.edit && <div className="">
          <h4>
           Edit Book</h4>
          <div className="row">
            <form name="edit_book" className="col s12" onSubmit={ this.handleFormSubmit }>
              <div className="">
                <div className="row">
                  <div className="col s12">
                    <b>Title</b>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      onChange={ this.onChange }
                      defaultValue={ this.state.title }
                      className="validate"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>Author</b>
                    <input
                      id="author"
                      type="text"
                      name="author"
                      className="validate"
                      onChange={ this.onChange }
                      defaultValue={ this.state.author }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6">
                    <b>Quantity</b>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      className="validate"
                      onChange={ this.onChange }
                      defaultValue={ this.state.quantity }
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>ISBN</b>
                    <input
                      id="isbn"
                      name="isbn"
                      type="text"
                      onChange={ this.onChange }
                      defaultValue={ this.state.isbn }
                      className="validate"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <b>Description</b>
                    <textarea
                      id="description"
                      className="materialize-textarea"
                      name="description"
                      onChange={ this.onChange }
                      defaultValue={ this.state.description }
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                name="submit"
              >Edit Book
              </button>
              <div>
                <button
                  onClick={ this.changeView }
                  id="edit_button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
        }

        {this.state.displayBook && <div className="card" id="book_card">
          <div className="card-image">
            <img id="cover" src={ this.props.cover } alt="loading cover..." />
            <span className="card-title">{this.props.title}</span>
          </div>
          <div className="card-content">
            <p>{this.props.description}</p>
          </div>
          <div className="card-action">
            <button className="btn-danger" onClick={ this.handleClick } >Delete</button>
            <button className="btn-primary" onClick={ this.onClick } id="edit_button">Edit</button>
          </div>
        </div>}
      </div>
    );
  }
}

AllBooks.propTypes = {
  author: React.PropTypes.string,
  cover: React.PropTypes.string,
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  isbn: React.PropTypes.string,
  quantity: React.PropTypes.string,
  title: React.PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBook
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AllBooks);
