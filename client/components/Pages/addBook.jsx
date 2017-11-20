import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      quantity: '',
      category: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 authenticationWrapper">
            <div className="authenticationBox">
              <h4 className="text-center">ADD BOOK</h4>
              <form className="glyphicon" onSubmit={ this.onSubmit }>
                <div className="form-group input-group">
                  <input
                    className="form-control" value={ this.state.title } onChange={ this.onChange } type="text"
                    name="title"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="form-group input-group">
                  <input
                    className="form-control" value={ this.state.author } onChange={ this.onChange } type="text"
                    name="author" placeholder="Author"
                    required
                  />
                </div>
                <div className="form-group input-group">
                  <input
                    className="form-control" value={ this.state.quantity } onChange={ this.onChange } type="text"
                    name="quantity" placeholder="Quantity"
                    required
                  />
                </div>
                <div className="form-group input-group">
                  <label className="control-label">Category</label>
                  <select className="form-control" name="category" onChange={ this.onChange } value={ this.state.category } >
                    <option value="" disabled>Choose category</option>
                    <option value="Gold">Epic</option>
                    <option value="Silver">Action</option>
                    <option value="Bronze">Drama</option>
                  </select>
                </div>
                <div className="form-group input-group">
                  <textarea
                    col="10" row="10"
                    className="form-control" value={ this.state.description } onChange={ this.onChange } type="text"
                    name="description" placeholder="Description"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-success btn-block btn-cfh-green">Add Book</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
