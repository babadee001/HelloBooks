import axios from 'axios';
import jwt from 'jsonwebtoken';
import Materialize from 'materialize-css';
import { browserHistory } from 'react-router';
import setAuthorizationToken from '../utils/setAuthorization';
import { SET_CURRENT_USER, UNAUTH_USER, GET_ALL_USERS, SET_API_STATUS } from './types';

export function isFetching(status) {
  return {
    type: SET_API_STATUS,
    isFetching: status
  };
}

export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    user: currentUser,
    authenticated: true
  };
}

export const userSignupRequest = userData => (dispatch) => {
  dispatch(isFetching(true));
  return axios.post('api/v1/users/signup', userData)
    .then((response) => {
      dispatch(isFetching(false));
      localStorage.setItem('token', response.data.Token);
      setAuthorizationToken(response.data.Token);
      const decoded = jwt.decode(response.data.Token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      dispatch(isFetching(false));
      Materialize.toast(error.data.message,
        4000,
        'red');
    });
  }
export const userSigninRequest = userData => (dispatch) => {
  dispatch(isFetching(true));
  return axios.post('api/v1/users/signin', userData)
    .then((response) => {
      dispatch(isFetching(false));
      localStorage.setItem('token', response.data.Token);
      setAuthorizationToken(response.data.Token);
      const decoded = jwt.decode(response.data.Token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      dispatch(isFetching(false));
      Materialize.toast(error.data.message,
        4000,
        'red');
    });
};

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {},
      authenticated: false
    });
    browserHistory.push('/');
  };
}
/** Edit profile action
 * @param {Number} userId - User ID
 * 
 * @param {Object} userData - User data object
 * 
 * @returns { String } - JWT Token
 */
export function editProfileAction(userId, userData) {
  return dispatch => axios.put(`api/v1/users/${userId}`, userData)
      .then((response) => {
        dispatch({
          type: EDIT_PROFILE,
          user: jwt.decode(response.data.token)
        });
        localStorage.setItem('token', response.data.token);
        Materialize.toast('Profile edited Successfully',
          1000, 'blue darken-4', () => {
            $('.modal').modal('close');
          });
      })
    .catch(error => Materialize.toast(error.response.data.message));
}
export function getUsers() {
  return dispatch => axios.get('api/v1/users')
    .then((res) => {
      dispatch({
        type: GET_ALL_USERS,
        data: res.data
      });
      return res.data;
    })
    .catch(error => error);
}

export const googleSigninRequest = token  => (dispatch) => {
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
  const decoded = jwt.decode(token);
  dispatch(setCurrentUser(decoded));
}
