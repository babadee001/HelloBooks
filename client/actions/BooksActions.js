import axios from 'axios';
import dotenv from 'dotenv';
import swal from 'sweetalert';
import { browserHistory } from 'react-router';

import {
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  ADD_BOOK,
  GET_UNRETURNED_BOOKS,
  RETURN_BOOK,
  GET_BORROWED_HISTORY,
  GET_ALL_TIME_BORROWED,
  ADD_CATEGORY,
  GET_CATEGORY
} from './types';
import { isFetching } from './AuthActions';

dotenv.load();

/**
 * @description - Get all books action
 *
 * @returns { Object } - Object containing book data
 */
export const getBooks = () => (dispatch) => {
  dispatch(isFetching(true));
  return axios.get('api/v1/books')
    .then((res) => {
      dispatch({
        type: GET_ALL_BOOKS,
        data: res.data
      });
      dispatch(isFetching(false));
      return res.data;
    })
    .catch(error => error);
};

/**
 * @description - Get books borrowed and not returned action
 *
 * @param {  Number } userId - ID of user
 *
 * @returns { Object } - Object containing borrowed books not returned
 */
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

/**
 * @description - Get borrowed history action
 *
 * @param {  Number } userId - User ID
 *
 * @returns { Object } - Object of all books borrowed, returned & unreturned
 */
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
};

/**
 * @description - Modify book action
 *
 * @param {Object} details - Object containing details of the book
 *
 * @param {bookId} bookId - ID of book to be modified
 *
 * @returns { String } - Message from API
 */
export function editBook(details, bookId) {
  return dispatch => axios.put(`api/v1/books/${bookId}`, details)
    .then((res) => {
      dispatch({
        type: EDIT_BOOK,
        data: res.data.book
      });
      return res.data.message;
    })
    .catch(error => error.data.message);
}

/**
 * @description - Borrow book action
 *
 * @param { Number } userId - ID of user to borrow book
 *
 * @param { Number } bookId - ID of book to be borrowed
 *
 * @returns { String } - String
 */
export function borrowBook(userId, bookId) {
  const currentDate = new Date(),
    after30days = currentDate.setDate(currentDate.getDate() + 20),
    deadline = new Date(after30days);
  swal({
    title: 'Are you sure?',
    text: `You are required to return this book on or before ${deadline}`,
    icon: 'warning',
    buttons: true,
    dangerMode: true
  }).then((willBorrow) => {
    if (willBorrow) {
      return axios.post(`api/v1/users/${userId}/books/${bookId.bookId}`)
        .then((res) => {
          const message = res.data.message;
          if (res) {
            swal(message, { icon: 'success' });
          }
        }).catch(error => swal(error.data.message));
    }
  })
    .catch(error => error);
}

/**
 * @description - Return books action
 *
 * @param {  Number } userId - ID of user to return book
 *
 * @param { Number } bookId - ID of book to be returned
 *
 * @returns { Object } - Object containing rented books
 */
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

/**
 * @description - Add new book action
 *
 * @param {Object} bookDetails - Object containing book data
 *
 * @returns { Object } - Redux action to be dispatched to the store
 */
export function addBookAction(bookDetails) {
  return dispatch => axios.post('api/v1/books', bookDetails)
    .then((res) => {
      Materialize.toast('Book added Successfully', 2000, 'teal', () => {
        this.setState({ isLoading: false });
      });
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
      browserHistory.push('/admin');
    })
    .catch(error => swal(error.data.message));
}

/**
 * @description - Delete book action
 *
 * @param {Number} bookId - Book ID
 *
 * @returns { String } - string containing API message
 */
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

/**
 * @description - Get all borrowed books in the application action
 *
 * @returns { Object } - Object of all time borrowed books,returned & unreturned
 */
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

/**
 * @description - Add category action
 *
 * @param { Object } data - New category data
 *
 * @returns { String } - Message from the API
 */
export function addCategoryAction(data) {
  return dispatch => axios.post('api/v1/books/category', data)
    .then((response) => {
      dispatch({
        type: ADD_CATEGORY,
        data: response.data.newCategory
      });
      Materialize.toast('Category added successfully', 2000, 'teal');
    })
    .catch((error => swal(error.data.message)));
}

/**
 * @description - Get all category action
 *
 * @returns { Object } - Object containg all categories
 */
export function getCategoryAction() {
  return dispatch => axios.get('/api/v1/books/category')
    .then((response) => {
      dispatch({
        type: GET_CATEGORY,
        data: response.data
      });
    })
    .catch(error => error);
}
