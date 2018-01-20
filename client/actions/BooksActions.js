import axios from 'axios';
import dotenv from 'dotenv';
import { 
  GET_ALL_BOOKS, 
  DELETE_BOOK, 
  EDIT_BOOK, 
  ADD_BOOK,
  GET_UNRETURNED_BOOKS, 
  RETURN_BOOK, 
  GET_BORROWED_HISTORY, 
  GET_ALL_TIME_BORROWED 
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
      })
      dispatch(isFetching(false));
      return res.data;
    })
    .catch(error => error);
}

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
 * @returns { Object } - Object containing all books borrowed, returned and unreturned
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
}

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
  return axios.post(`api/v1/users/${userId}/books/${bookId.bookId}`)
    .then(res => res.data.message)
    .catch(error => error.data.message);
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
    .catch(error => swal(error.data.message));
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
      dispatch({
        type: ADD_BOOK,
        message: res.data.message
      });
    })
    .catch(error => error.data.message);
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
    .catch(error => Materialize.toast(error.data.message, 1000));
}

/**
 * @description - Get all borrowed books in the application action
 *
 * @returns { Object } - Object containing all time borrowed books, returned and unreturned
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
    .catch(error => error.data.message);
}
