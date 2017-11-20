import React, { Component } from 'react';
import ImageUploader from 'react-firebase-image-uploader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategory } from '../../actions/booksActions';
import firebase from 'firebase';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleError: '',
      authorError: '',
      prodYearError: '',
      isbnError: '',
      descError: '',
      title: '',
      isbn: '',
      description: '',
      cover: '',
      author: '',
      catId: '',
      total: 5,
      prodYear: '',
      isLoading: '',
      isUploading: '',
      progress: 0
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.renderCategory = this
      .renderCategory
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.onBlur = this
      .onBlur
      .bind(this);
    this.onFocus = this
      .onFocus
      .bind(this);
    this.handleUploadSuccess = this
      .handleUploadSuccess
      .bind(this);
    this.handleProgress = this
      .handleProgress
      .bind(this);
    this.handleUploadStart = this
      .handleUploadStart
      .bind(this);
    this.handleUploadError = this
      .handleUploadError
      .bind(this);
  }

  handleProgress(progress) {
    this.setState({ progress });
  }
  handleUploadError(error) {
    this.setState({ isUploading: false });
    console.error(error);
  }

  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ cover: url, progress: 100 });
      });
  }

  componentDidMount() {
    this
      .props
      .actions
      .getCategory();
  }

  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onFocus(event) {
    const value = event.target.value,
      name = event.target.name;

    switch (name) {
      case 'title':
        this.setState({ titleError: '' });
        break;
      case 'author':
        this.setState({ authorError: '' });
        break;
      case 'prodYear':
        this.setState({ prodYearError: '' });
        break;
      case 'description':
        this.setState({ descError: '' });
        break;
      case 'isbn':
        this.setState({ isbnError: '' });
        break;
      default:
        this.setState(this.state);
    }
  }

  onBlur(event) {
    const value = event.target.value,
      name = event.target.name;

    switch (name) {
      case 'title':
        if (value.length < 2 || !value) {
          this.setState({ titleError: 'Book title must be greater than 2 characters' });
          break;
        }

      case 'author':
        if (value.length < 2 || !value) {
          this.setState({ authorError: 'Book author name must be greater than 2 characters' });
          break;
        }
      case 'prodYear':
        if (value.length < 4 || !value) {
          this.setState({ prodYearError: 'Production year is not valid' });
          return false;
          break;
        }
      case 'description':
        if (value.length < 5 || !value) {
          this.setState({ descError: 'Book description is required' });
          break;
        }
      case 'isbn':
        if (value.length < 5 || !value) {
          this.setState({ isbnError: 'Book ISBN must be a minimum of 5 characters' });
          break;
        }
      default:
        this.setState(this.state);
    }
  }
  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0 });
  }

  renderCategory() {
    const allCat = [];
    const category = this.props.category;
    if (!category || category.length < 1) {
      return '...loading';
    }
    category.map((cat) => {
      allCat.push(
        <option key={ cat.id } value={ cat.id }>{ cat.name }</option>
      );
    });
    return allCat;
  }

  handleSubmit(event) {
    if (this.state.cover.length < 5) {
      <Toast toast="Please upload book cover!">
        Toast
      </Toast>;
    //   Materialize.toast('Please upload book cover', 4000, '#15b39d');
      event.preventDefault();
      return false;
    }
    event.preventDefault();
    this
      .props
      .onSubmit(this.state)
      .then((message) => {
        Materialize.toast('Book added Successfully', 2000, '#15b39d', () => {
          this.setState({ isLoading: false });
        });
        window.location.href = '/admin';
      })
      .catch(err => err);
  }

  render() {
    return (
      <div
        style={{
          marginTop: 20,
          backgroundColor: '#fff',
          width: '70%',
          float: 'right',
          marginRight: 100
        }}
      >
        <div className="row">
          <form name="add_book" className="col s12" onSubmit={ this.handleSubmit }>
            <div className="add-book">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="title"
                    type="text"
                    name="title"
                    className="validate"
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                    onBlur={ this.onBlur }
                    required
                  />
                  <label htmlFor="isbn">Title</label>
                  <div className="red-text">{ this.state.titleError }</div>
                </div>
                <div className="input-field col s6">
                  <input
                    id="author"
                    type="text"
                    name="author"
                    className="validate"
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                    onBlur={ this.onBlur }
                    required
                  />
                  <label htmlFor="isbn">Author</label>
                  <div className="red-text">{ this.state.authorError }</div>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="total"
                    name="total"
                    type="number"
                    className="validate"
                    defaultValue="1"
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                    required
                  />
                  <label htmlFor="isbn">Total</label>
                </div>

                <div className="input-field col s6">
                  <input
                    id="prodYear"
                    name="prodYear"
                    type="number"
                    className="validate"
                    onChange={ this.onChange }
                    onBlur={ this.onBlur }
                    onFocus={ this.onFocus }
                    required
                  />
                  <label htmlFor="prodYear">Production Year</label>
                  <div className="red-text">{ this.state.prodYearError }</div>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <select
                    id="catId"
                    name="catId"
                    onChange={ this.onChange }
                    className="browser-default"
                  >
                    <option value="">Select Category</option>
                    { this.renderCategory() }
                  </select>
                </div>
                <div className="input-field col s6">
                  <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    className="validate"
                    onChange={ this.onChange }
                    onBlur={ this.onBlur }
                    onFocus={ this.onFocus }
                    required
                  />
                  <label htmlFor="isbn">ISBN</label>
                  <div className="red-text">{ this.state.isbnError }</div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    className="materialize-textarea"
                    name="description"
                    onBlur={ this.onBlur }
                    onChange={ this.onChange }
                    onFocus={ this.onFocus }
                  />
                  <label htmlFor="description">Description</label>
                  <div className="red-text">{ this.state.descError }</div>
                </div>
              </div>
              <span>Upload Cover</span><br /><br />
              { this.state.isUploading &&
                this.state.progress < 100 &&
                <div> <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div><div className="gap-patch">
                      <div className="circle" />
                    </div><div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div> <br /><br /> </div> }
              { this.state.progress === 100 &&
                <div>
                  <img
                    height="50px"
                    width="50px"
                    alt="check mark"
                    src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/512/Tick_Mark-128.png"
                  /><br /></div> }
              <ImageUploader
                name="cover"
                storageRef={ firebase
                  .storage()
                  .ref('images') }
                onProgress={ this.handleProgress }
                onUploadSuccess={ this.handleUploadSuccess }
                onUploadStart={ this.handleUploadStart }
              />
            </div>
            <button
              style={{
                backgroundColor: 'rgb(37, 76, 71)',
                color: '#fff',
                float: 'right'
              }}
              className="btn waves-effect waves-light"
              type="submit"
              name="submit"
              disabled={ this.state.isLoading }
            >Add Book
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getCategory
    }, dispatch)
  };
}
function mapStateToProps(state) {
  return { category: state.book.category };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
