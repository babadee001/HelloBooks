import axios from 'axios';

/**
 * @description - Check if user details exists
 *
 * @param {object} userData - user details
 *
 * @returns {String, object} - String
 */
export function checkExisting(userData) {
  return axios
    .post('api/v1/users/existing', userData)
    .then((response) => {
      if (response.data.message !== null){
        return response.data.message;
      }
        return 'Not found';
    })
    .catch(error => (error))
}

/**
 * @description - Check if username exists
 *
 * @param {object} userData - user details
 *
 * @returns {String, object} - String
 */
export function checkUser(userData) {
  return axios
    .post('api/v1/users/checkuser', userData)
    .then((response) => {
      if (response.data.message !== null){
        return response.data.message;
      }
        return 'Not found';
    })
    .catch(error => (error))
}

