import axios from 'axios';
import dotenv from 'dotenv';
import { 
  GET_ALL_BOOKS, 
  DELETE_BOOK, 
  EDIT_BOOK, 
  ADD_BOOK, 
  ADD_CATEGORY, 
  GET_UNRETURNED_BOOKS, 
  RETURN_BOOK, 
  GET_BORROWED_HISTORY, 
  GET_ALL_TIME_BORROWED 
} from './types';
import { isFetching } from './authActions';

dotenv.load();
export function addBook(book) {
  return { type: ADD_BOOK, book };
}
export const getBooks = () => (dispatch) => {
  dispatch(isFetching(true));
  return axios.get('api/v1/books')
    .then((res) => {
      dispatch({
        type: GET_ALL_BOOKS,
        data: res.data
      })
      dispatch(isFetching(false));
      return res.data;
    })
    .catch(error => error);
}
export function getBorrowed(userId) {
  return dispatch => axios.get(`api/v1/users/${userId}/books?returned=false`)
    .then((res) => {
      dispatch({
        type: GET_UNRETURNED_BOOKS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

export const getHistory = userId => (dispatch) => {
  dispatch(isFetching(true));
  return axios.get(`api/v1/users/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_BORROWED_HISTORY,
        data: res.data
      });
      dispatch(isFetching(false));
      return res.data;
    })
    .catch(error => error);
}

export function editBook(details, bookId) {
  return dispatch => axios.put(`api/v1/books/${bookId}`, details)
    .then((res) => {
      dispatch({
        type: EDIT_BOOK,
        data: res.data.book
      });
      return res.data.message;
    })
    .catch(error => error);
}

export function borrowBook(userId, bookId) {
  return axios.post(`api/v1/users/${userId}/books/${bookId.bookId}`)
    .then(res => res.data.message)
    .catch(error => error.data.message);
}
export function returnBook(userId, bookId) {
  return dispatch => axios.put(`api/v1/users/${userId}/books/${bookId.bookId}`)
    .then((response) => {
      const message = response.data.message;
      if (response) {
        swal(message, { icon: 'success' });
      } else {
        swal(message, { icon: 'warning' });
      }
      dispatch({
        type: RETURN_BOOK,
        data: response.data.book
      });
    })
    .catch(error => swal(error));
}
export function addBookAction(bookDetails) {
  return dispatch => axios.post('api/v1/books', bookDetails)
    .then((res) => {
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
    })
    .catch(error => error);
}

export function addCategory(data) {
  return dispatch => axios.post('api/v1/books/cat', data)
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY,
        data: res.data.category
      });
      return res.data.message;
    })
    .catch(error => error);
}
export function deleteBookAction(bookId) {
  return dispatch => axios.delete(`api/v1/books/${bookId}`)
    .then((res) => {
      dispatch({
        type: DELETE_BOOK,
        data: Number(res.data.id)
      });
      return res.data.message;
    })
    .catch(error => Materialize.toast(error.response.data.message, 1000));
}
export function getAllBorrowed() {
  return dispatch => axios.get('api/v1/books/borrowed')
    .then((res) => {
      dispatch({
        type: GET_ALL_TIME_BORROWED,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}
