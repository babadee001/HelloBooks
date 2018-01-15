import axios from 'axios';

/**
 * @description - Check if user details exists
 *
 * @param {object} detail - user details
 *
 * @returns {String} - String
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

