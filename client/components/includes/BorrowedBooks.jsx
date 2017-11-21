import React, { Component } from 'react';
import swal from 'sweetalert';
import { returnBook } from '../../actions/booksActions';

export default class BorrowedBooks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  handleClick() {
    const userId = this.props.userId;
    const bookId = { bookId: this.props.id };
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to return this book?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((toReturn) => {
      if (toReturn) {
        returnBook(userId, bookId)
          .then((res) => {
            if (res === 'Book returned!') {
              swal(res, { icon: 'success' });
            } else {
              swal(res, { icon: 'warning' });
            }
          });
      }
    });
  }
  render() {
    console.log(this.props.cover);
    return (
      <div className="book col s12 m3 l3">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={ this.props.cover } alt="" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.props.title}</span>
            <span>{this.props.description}</span>
            <p>
              <button onClick={ this.handleClick } className="btn">Return</button>
              {this.props.isReturned && <button onClick={ this.handleClick } className="btn disabled">Returned</button>}
            </p>
          </div>
        </div>
      </div>

    );
  }
}
