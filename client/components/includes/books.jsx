import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from '../Navbar';
import { borrowBook } from '../../actions/BooksActions';

export default class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  handleClick() {
    const userId = this.props.userId;
    const bookId = { bookId: this.props.id };
    const currentDate = new Date(),
      after30days = currentDate.setDate(currentDate.getDate() + 20),
      deadline = new Date(after30days);
    swal({
      title: 'Are you sure?',
      text: `You ware required to return this book on or before ${deadline}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willBorrow) => {
      if (willBorrow) {
        borrowBook(userId, bookId)
          .then((res) => {
            if (res === 'You have successfully borrowed the book') {
              swal(res, { icon: 'success' });
            } else {
              swal(res, { icon: 'warning' });
            }
          });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="col s12 m3 l3">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={ this.props.cover } id="cover" alt="cover" />
            </div>
            <div className="card-content">
              <span className="card-title">{this.props.title}</span>
              <span>{this.props.description}</span>
              <p>
                <button onClick={ this.handleClick } className="btn">Borrow</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
