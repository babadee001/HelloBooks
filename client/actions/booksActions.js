import axios from 'axios';
import dotenv from 'dotenv';
import { GET_ALL_BOOKS, DELETE_BOOK, EDIT_BOOK, ADD_BOOK, ADD_CATEGORY, GET_UNRETURNED_BOOKS, RETURN_BOOK, GET_BORROWED_HISTORY } from './types';

dotenv.load();
export function addBook(book) {
  return { type: ADD_BOOK, book };
}
export function getBooks() {
  return dispatch => axios.get('api/v1/books')
    .then((res) => {
      dispatch({
        type: GET_ALL_BOOKS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

export function deleteBook(book) {
  return { type: DELETE_BOOK, book };
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

export function getHistory(userId) {
  return dispatch => axios.get(`api/v1/users/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_BORROWED_HISTORY,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}
export function editBook(details, bookId) {
  return axios.put(`api/v1/books/${bookId}`, details)
    .then(res => res.data.message)
    .catch(error => error.data.message);
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
  return axios.delete(`api/v1/books/${bookId}`)
    .then(res => res.data.message)
    .catch(error => error.data.message);
}
