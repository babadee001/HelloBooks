import axios from 'axios';

/**
 * @description - setAuthorizationToken - set token to request headers
 *
 * @param  {string} token Authorization token
 *
 * @return {void} no return or void
 */
export default function setAuthorization(token) {
  if (token) {
    axios.defaults.headers.common.xaccesstoken = `${token}`;
  } else {
    delete axios.defaults.headers.common.xaccesstoken;
  }
}
