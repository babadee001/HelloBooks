import axios from 'axios';

export default function userSignupRequest(userData) {
  return dispatch => axios.post('api/v1/users/signup', userData);
}

export function userSigninRequest(userData) {
  return dispatch => axios.post('api/v1/users/signin', userData);
}
