import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from '../navbar';
import { returnBook } from '../../actions/booksActions';

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
      swal({
        title: 'Are you sure?',
        text: 'Do you really want to return this book?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((toReturn) => {
        if (toReturn) {
          this.props.actions.returnBook(userId, bookId)
      }
      })}

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
                <button onClick={ this.handleClick } className="btn">Return</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
