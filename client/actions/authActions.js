import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorization';

export default function userSignupRequest(userData) {
  return dispatch => axios.post('api/v1/users/signup', userData).then((res) => {
    const token = res.data.Token;
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
  });
}

export function userSigninRequest(userData) {
  return dispatch => axios.post('api/v1/users/signin', userData);
}
