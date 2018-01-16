import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description - validateInput component
 * 
 * @export {Object} validateInput component
 * 
 * @class validateInput
 * 
 * @extends {Component}
 */
export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'passwords must match';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
