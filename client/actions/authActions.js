import axios from 'axios';
import jwt from 'jsonwebtoken';
import Materialize from 'materialize-css';
import setAuthorizationToken from '../utils/setAuthorization';
import { SET_CURRENT_USER, UNAUTH_USER } from './types';

export default function userSignupRequest(userData) {
  return dispatch => axios.post('api/v1/users/signup', userData)
    .then((res) => {
      const token = res.data.Token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch({
        type: SET_CURRENT_USER,
        user: jwt.decode(res.data.Token),
        authenticated: true
      });
      Materialize.toast('Sign Up Successfully', 2000, 'teal',
        () => {
          window.location.href = '/dashboard';
        });
    })
    .catch(error => Materialize.toast(error.data.message, 2000, 'red'));
}

export function userSigninRequest(userData) {
  return dispatch => axios.post('api/v1/users/signin', userData).then((res) => {
    localStorage.setItem('token', res.data.Token);
    const decoded = jwt.decode(res.data.Token);
    dispatch({
      type: SET_CURRENT_USER,
      user: decoded.currentUser,
      authenticated: true
    });
    Materialize.toast('Logged In Successfully', 1000,
      'teal',
      () => {
        window.location.href = '/admin';
      }
    );
  })
    .catch(error => Materialize.toast(error.data.message,
      4000,
      'red'));
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch({
      type: UNAUTH_USER,
      user: {},
      authenticated: false
    });
    // window.location.href = '/';
  };
}
export function editProfile(userId, userData) {
  return axios.put(`/edit/${userId}`, userData)
    .then(() => axios.get(`seaech/${userId}`)
      .then(res => res.data.token))
    .catch(error => error.data.response);
}
